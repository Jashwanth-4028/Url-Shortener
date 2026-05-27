import validator from 'validator';

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name?.trim()) errors.push('Name is required');
  if (!email?.trim()) errors.push('Email is required');
  else if (!validator.isEmail(email)) errors.push('Invalid email format');
  if (!password) errors.push('Password is required');
  else if (password.length < 6) errors.push('Password must be at least 6 characters');

  if (errors.length) {
    return res.status(400).json({ success: false, message: errors.join('. ') });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email?.trim()) errors.push('Email is required');
  if (!password) errors.push('Password is required');

  if (errors.length) {
    return res.status(400).json({ success: false, message: errors.join('. ') });
  }
  next();
};

export const validateCreateUrl = (req, res, next) => {
  const { originalUrl, customAlias, expiryDate } = req.body;
  const errors = [];

  if (!originalUrl?.trim()) {
    errors.push('Original URL is required');
  } else if (!validator.isURL(originalUrl, { require_protocol: true })) {
    errors.push('URL must include http:// or https://');
  }

  if (customAlias) {
    if (!/^[a-zA-Z0-9-_]{3,30}$/.test(customAlias)) {
      errors.push('Custom alias must be 3-30 chars (letters, numbers, - _)');
    }
  }

  if (expiryDate && isNaN(Date.parse(expiryDate))) {
    errors.push('Invalid expiry date');
  }

  if (errors.length) {
    return res.status(400).json({ success: false, message: errors.join('. ') });
  }
  next();
};

export const validateUpdateUrl = (req, res, next) => {
  const { originalUrl, expiryDate } = req.body;
  const errors = [];

  if (originalUrl !== undefined) {
    if (!originalUrl?.trim()) errors.push('Original URL cannot be empty');
    else if (!validator.isURL(originalUrl, { require_protocol: true })) {
      errors.push('URL must include http:// or https://');
    }
  }

  if (expiryDate !== undefined && expiryDate !== null && isNaN(Date.parse(expiryDate))) {
    errors.push('Invalid expiry date');
  }

  if (errors.length) {
    return res.status(400).json({ success: false, message: errors.join('. ') });
  }
  next();
};
