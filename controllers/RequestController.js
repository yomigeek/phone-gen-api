import dotenv from 'dotenv';
import fs from 'fs';
import storageFilePath from '../storage/path';

dotenv.config();

class RequestController {
  static generateNumbers(req, res) {
    const { quantity } = req.body;
    const numbersArray = [];
    
    if (fs.existsSync(storageFilePath)) {
      fs.readFile(storageFilePath,function(err,content){
        if(err) throw err;
        const parseJson = JSON.parse(content);

        for (let i = 0; i < quantity; i++) {
          const len = 9;
          const number = parseInt((Math.random() * 9 + 1) * Math.pow(10,len-1), 10);
          if (parseJson.indexOf(number) === -1)  parseJson.push('0'+ number);;
        }
        fs.writeFileSync(storageFilePath,JSON.stringify((parseJson), null, 2),function(err){
          if(err) throw err;
        })
      })
      return RequestController.requestMessage(res, `${quantity} new number(s) added!`);
    }
    else {
      for (let i = 0; i < quantity; i++) {
        const len = 9;
        const number = parseInt((Math.random() * 9 + 1) * Math.pow(10,len-1), 10);
        if (numbersArray.indexOf(number) === -1)  numbersArray.push('0'+ number);;
      }
      fs.writeFileSync(storageFilePath, JSON.stringify((numbersArray), null, 2),function(err){
        if(err) throw err;
      })
      return RequestController.requestMessage(res, `${quantity} new number(s) generated!`);
    }
  
  }

  static requestMessage(res, message) {
    return res.status(201).json({
      status: "success",
      statusCode: 201,
      message
    });
  }

  static getTotal(req, res) {
    if (fs.existsSync(storageFilePath)) {
      fs.readFile(storageFilePath,function(err,content){
        if(err) throw err;
        const parseJson = JSON.parse(content);

        return res.status(200).json({
          status: "success",
          statusCode: 200,
          message: `Total of ${parseJson.length} numbers have been generated`
        });
      })
    }
    else {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "No numbers has been generated yet"
      });
    }
  }
}

export default RequestController;
