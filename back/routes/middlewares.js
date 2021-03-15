exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(401).send('로그인이 필요합니다.')
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }
    return res.status(401).send('로그인 상태에서는 사용이 불가합니다.')
};