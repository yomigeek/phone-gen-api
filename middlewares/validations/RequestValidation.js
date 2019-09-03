import Validator from "validatorjs";

class RequestValidation {

  static checkQuantity(req, res, next) {
    const msgInfo = {
      quantity: "required|numeric|min:1|max:500",
    };
    const validator = new Validator(req.body, msgInfo);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        errors
      });
    });
  }

}

export default RequestValidation;
