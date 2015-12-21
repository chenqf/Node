var nodemailer = require('nodemailer'),
    config = require('../config/config');
    transporter = nodemailer.createTransport({
    service: 'QQ',
    //host:'smtp.exmail.qq.com',
    //secureConnection: true, // use SSL
    //port:465,
    auth: {
        user: config.mail.username,
        pass: config.mail.password
    }
});
module.exports = {
    sendMail:function(options){
        var mailOptions = {
            from:config.mail.fromName,
            /*¸½¼þ*/
            attachments: [
                //{
                //    filename: 'text0.txt',
                //    content: 'hello world!'
                //},
                //{
                //    filename: 'text1.txt',
                //    path: './package.json'
                //}
            ]
        };
        if(!options.to || !options.subject){
            return false;
        }
        mailOptions.to  = options.to;
        mailOptions.html = options.html;
        mailOptions.subject = options.subject;
        options.cc && (mailOptions.cc = options.cc);//³­ËÍ
        options.bcc && (mailOptions.bcc = options.bcc);//ÃÜËÍ
        options.attachments && (mailOptions.attachments = options.attachments);//¸½¼þ

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
};
