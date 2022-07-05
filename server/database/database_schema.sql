CREATE DATABASE mwa_proposals;

CREATE TABLE mwa_user(
    u_id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(20) NOT NULL,
    pword CHAR(64) NOT NULL -- the SHA256 hash of created password
);

-- Make sure validation matches this schema
CREATE TABLE proposal(
    p_id SERIAL PRIMARY KEY,
    proposaltitle varchar(50),
    contactemail varchar(30),
    proposalmembers json[],
    areasofscience varchar(10),
    requestedtimecategory varchar(5),
    totaltimerequested numeric,
    islargeproposal boolean,
    sharedtimerequested numeric,
    commensalproposals varchar(50)[],
    arrayconfig varchar(13),
    requestedfrequencies text,
    observingmodesrequested text,
    iscontinuation boolean,
    proposalinterruptibility text,
    proposalabstract text,
    descriptionfileLocation text,
    calibratorfields varchar(10),
    sources json[],
    frequencysets text[],
    u_id SERIAL REFERENCES mwa_user(u_id)
);