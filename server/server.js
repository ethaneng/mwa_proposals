const fetch = require('node-fetch');
const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require('cors')
const app = express()
const pool = require('./database/db')
const path = require('path')

const PORT = 5000

app.use(cors())

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

//Handle file upload for sources
//Requires file in posted formData
//Responds with string of the data in the included file
app.use('/read_sources_from_file', fileUpload())
app.post('/read_sources_from_file', (req, res) => {
    const file = req.files.sourceFile
    const data = file.data

    try {
        res.status(200).send(data)
    }catch(err){
        res.json({message: err})
    }
})

//Handle proposal submission
//Requires formValues state from frontend passed as json object
//Creates new record in db for the proposal
app.use('/submit_proposal', express.json())
app.post('/submit_proposal', async (req, res) => {
    try {
        const {proposaltitle,
            contactemail,
            proposalmembers,
            areasofscience,
            requestedtimecategory,
            totaltimerequested,
            islargeproposal,
            sharedtimerequested,
            commensalproposals,
            arrayconfig,
            requestedfrequencies,
            observingmodesrequested,
            iscontinuation,
            proposalinterruptibility,
            proposalabstract,
            descriptionfile,
            calibratorfields,
            sources,
            frequencysets,
            u_id} = req.body

            
            // send to postgres
            const newProposal = await pool.query(`INSERT INTO proposal (proposaltitle, contactemail, proposalmembers, areasofscience, requestedtimecategory, totaltimerequested, islargeproposal, sharedtimerequested, commensalproposals, arrayconfig, requestedfrequencies, observingmodesrequested, iscontinuation, proposalinterruptibility, proposalabstract, descriptionfilelocation, calibratorfields, sources, frequencysets, u_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`, [proposaltitle, contactemail, proposalmembers, areasofscience, requestedtimecategory, totaltimerequested, islargeproposal, sharedtimerequested, commensalproposals, arrayconfig, requestedfrequencies, observingmodesrequested, iscontinuation, proposalinterruptibility, proposalabstract, descriptionfile, calibratorfields, sources, frequencysets, u_id])
            res.json(newProposal)
            console.log('inserted proposal into db')
    } catch (error) {
        res.send(error)
    }
})

//Gathers all proposals to view for user
app.get('/get_proposals', (req, res) => {
    const user = req.query.user

    const query = `SELECT * FROM proposal WHERE u_id = ${user}`
    
    pool
        .query(query)
        .then(result => res.json(result.rows))
        .catch(err => res.json(err))
})

//Handle proposal update
app.post('/update_proposal', (req, res) => {
    
})

//Handle proposal delete 
app.get('/delete_proposal/:id', async (req, res) => {
    // make sure to delete the descriptions file hosted on s3
    const id = req.params.id

    const fileQuery = 'SELECT descriptionfilelocation FROM proposal WHERE (p_id=$1)'
    const delQuery = 'DELETE FROM proposal WHERE (p_id=$1)'

    // query the db for the s3 file key for the description file
    let fileKey = ''
    console.log('getting file key')

    try {
        let response = await pool.query(fileQuery, [id])
        fileKey = await response.rows[0].descriptionfilelocation
    } catch (error) {
        throw error
    }

    console.log('filekey: ', fileKey)

    // delete the s3 object for the description file of the proposal
    console.log('trying to delete filekey')
    try {
        let response = await fetch(`https://yeff5pf5q3744vjr5fmhunx2je0lqbqc.lambda-url.ap-southeast-2.on.aws/?key=${fileKey}`)
        if (!response.ok) {
            throw new Error("error occurred deleting file from s3 bucket")
        }
        let json = await response.json()
        console.log(json.body)
    } catch (error) {
        console.log(error)
    }

    // delete the proposal from the db
    try {
        let response = await pool.query(delQuery, [id])
        res.json('DELETED ', response.rowCount, 'PROPOSAL')
    } catch (error) {
         res.json(error)
    }
})

//Handle proposal view 
app.post('/view_proposal', (req, res) => {
    
})

app.listen(PORT, () => {console.log(`Server started at http://localhost:${PORT}`)})