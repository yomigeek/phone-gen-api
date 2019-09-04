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
      RequestController.numbersNotFound(res);
    }
  }

  static getNumbers(req, res) {
    if (fs.existsSync(storageFilePath)) {
      fs.readFile(storageFilePath,function(err,content){
        if(err) throw err;
        const parseJson = JSON.parse(content);

        return res.status(200).json({
          status: "success",
          statusCode: 200,
          numbers: parseJson
        });
      })
    }
    else {
      RequestController.numbersNotFound(res);
    }
  }

  static sortInAsc(req, res){
    if (fs.existsSync(storageFilePath)) {
      fs.readFile(storageFilePath,function(err,content){
        if(err) throw err;
        const parseJson = JSON.parse(content);
        const sort = parseJson.sort(function(a, b){return a-b});

        return res.status(200).json({
          status: "success",
          statusCode: 200,
          numbers: sort
        });
      })
    }
    else {
      RequestController.numbersNotFound(res);
    }
  }

  static sortInDesc(req, res){
    if (fs.existsSync(storageFilePath)) {
      fs.readFile(storageFilePath,function(err,content){
        if(err) throw err;
        const parseJson = JSON.parse(content);
        const sort = parseJson.sort(function(a, b){return b-a});

        return res.status(200).json({
          status: "success",
          statusCode: 200,
          numbers: sort
        });
      })
    }
    else {
      RequestController.numbersNotFound(res);
    }
  }

  static getMaximumNum(req, res){
    if (fs.existsSync(storageFilePath)) {
      fs.readFile(storageFilePath,function(err,content){
        if(err) throw err;
        const parseJson = JSON.parse(content);
        const maximumValue = Math.max(...parseJson);

        return res.status(200).json({
          status: "success",
          statusCode: 200,
          maximumNumber: '0'+ maximumValue
        });
      })
    }
    else {
      RequestController.numbersNotFound(res);
    }
  }

  static getMinimumNum(req, res){
    if (fs.existsSync(storageFilePath)) {
      fs.readFile(storageFilePath,function(err,content){
        if(err) throw err;
        const parseJson = JSON.parse(content);
        const minimumValue = Math.min(...parseJson);

        return res.status(200).json({
          status: "success",
          statusCode: 200,
          minimumNumber: '0'+ minimumValue
        });
      })
    }
    else {
      RequestController.numbersNotFound(res);
    }
  }

  static numbersNotFound(res) {
    return res.status(404).json({
      status: "error",
      statusCode: 404,
      message: "No numbers has been generated yet"
    });
  }

  static requestMessage(res, message) {
    return res.status(201).json({
      status: "success",
      statusCode: 201,
      message
    });
  }
}

export default RequestController;
