const fs = require('fs');
const crypto = require('crypto');
const { domainToUnicode } = require('url');



const InitialCheck = async(fileInfo, res)=>{
    //create a map to store the infomation about the files

    const fileInfoMap = new Map(Object.entries(fileInfo));

    console.log(fileInfoMap);

    const fileSizes = new Map();
    const potentialDups = new Map();

    fileInfoMap.forEach((value, key) => {
        if(fileSizes.has(value.size)){
            console.log("Potential duplicate: " + value.originalname);
            potentialDups.set(value.size, value);
        }
        else fileSizes.set(value.size, value);
    })

    let duplicateFiles = new Map();

   duplicateFiles = await hashAndCheckHash(fileSizes, potentialDups);

   // Convert the Map to an object before sending it in the response
   const duplicateFilesObject = Object.fromEntries(duplicateFiles);

   console.log(Object.entries(duplicateFilesObject));

   res.status(200).json({message: duplicateFilesObject});
}

const hashAndCheckHash = async(fileSizes, potentialDups) =>{

    let duplicates = new Map();
    let i = 1; 

    potentialDups.forEach((value, key) =>{
        if(fileSizes.has(key)){


            const fSizeContentStream = fs.createReadStream(fileSizes.get(key).path);
            const pDupsContentStream = fs.createReadStream(value.path);

            try{
                const hash1 = crypto.createHash('md5');
                const hash2 = crypto.createHash('md5');

                let md5HashForfSize;
                let md5HashForpDups;

                fSizeContentStream.on('data', (chunk) => {
                    hash1.update(chunk);
                  });
                
                  fSizeContentStream.on('end', () => {
                    md5HashForfSize = hash1.digest('hex');
                    console.log(`MD5 Hash of ${fileSizes.get(key).originalname}: ${md5HashForfSize}`);
                  });
                
                  fSizeContentStream.on('error', (err) => {
                    console.error('Error reading file:', err.message);
                  });


                  
                  pDupsContentStream.on('data', (chunk) => {
                    hash2.update(chunk);
                  });
                
                  pDupsContentStream.on('end', () => {
                    md5HashForpDups = hash2.digest('hex');
                    console.log(`MD5 Hash of ${value.originalname}: ${md5HashForpDups}`);
                  });
                
                  pDupsContentStream.on('error', (err) => {
                    console.error('Error reading file:', err.message);
                  });


                  
                if(md5HashForfSize == md5HashForpDups){
                    console.log(value.originalname + " and " + fileSizes.get(key).originalname + " are duplicates!");
                    
                    duplicates.set(i,value);
                    i++;
                }

                
            }
            catch(error){
                console.log("An error occurred during hashing");
            }
        }
    });

    return duplicates;
}

module.exports= {InitialCheck};