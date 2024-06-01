import jwt from 'jsonwebtoken';

const generationToken = (id) => {
    return jwt.sign({ id }, process.env.jwt_secret, {
       expiresIn: '60d',
    });
};

export default generationToken;
