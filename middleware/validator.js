const { body, validationResult } = require('express-validator')

module.exports.register = [
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

module.exports.restaurant = [
  body('name').trim().escape().notEmpty().withMessage('餐廳名稱為必填。'),
  body('name_en').trim().optional().escape(),
  body('category').trim().notEmpty().withMessage('餐廳類別為必填。').bail()
    .isLength({ max: 6 }).withMessage('為求簡短，類別須為6字以內。'),
  body('image').notEmpty().withMessage('請附上餐廳相關圖片網址。').bail()
    .custom((imageURL) => {
      const regex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
      if (!imageURL.match(regex)) {
        throw new Error('請附上圖片網址。')
      }
      return true
    }),
  body('location').trim().notEmpty().withMessage('餐廳位置為必填。').escape(),
  body('phone').trim().notEmpty().withMessage('電話號碼為必填。').bail()
    .matches(/0\d{1,2}(\D?\d{3,4}){2}/).withMessage('請填寫正確的電話號碼格式。'),
  body('google_map').trim().notEmpty().withMessage('Google Map網址為必填。').bail()
    .matches(/https:\/\/goo\.gl\/maps\/[a-z|A-Z|0-9]+/).withMessage('請使用 Google Map 分享連結網址。'),
  body('rating').trim().notEmpty().withMessage('餐廳評分為必填。').bail()
    .isFloat({ min: 0, max: 5 }).withMessage('評分範圍為0到5，比照Google Map評分。'),
  body('description').trim().optional().escape(),
  (req, res, next) => {
    // if (err) console.log(err)
    const errors = validationResult(req)
    const restInfo = req.body
    if (!errors.isEmpty()) {
      const errorMsg = errors.errors.map(err => err.msg)
      console.log(errors)
      return res.render('new', { restInfo, errorMsg })
    }
    next()
  }
]
