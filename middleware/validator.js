const { body, validationResult } = require('express-validator')

module.exports = {
  register: [
    body('name').optional({ nullable: true }).trim().escape(),
    body('email')
      .notEmpty().withMessage('Email 為必填項目。').bail()
      .normalizeEmail().isEmail().withMessage('必須為有效的 Email 格式。'),
    body('password')
      .notEmpty().withMessage('密碼為必填項目。').bail()
      .isLength({ min: 8 }).withMessage('密碼至少要8個字。'),
    body('confirmPassword')
      .notEmpty().withMessage('確認密碼為必填項目。').bail()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('密碼與確認密碼不一致。')
        }
        return true
      }),
    (req, res, next) => {
      const errors = validationResult(req)
      const { name, email, password, confirmPassword } = req.body
      if (!errors.isEmpty()) {
        const errorMsg = errors.errors.map(err => err.msg)
        console.log(errors)
        return res.render('register', { errorMsg, name, email, password, confirmPassword })
      }
      next()
    }
  ]

}
