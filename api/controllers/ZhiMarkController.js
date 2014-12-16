/**
 * ZhiMarkController
 *
 * @description :: Server-side logic for managing zhimarks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var zhihu = require('zhihu');
var toMarkdown = require('to-markdown').toMarkdown;
module.exports = {
  translate: function(req, res, next) {
    var url = req.query.zhihu_url;
    if (!url) {
      res.json({
        error: 'Url is required!'
      });
    } else {
      zhihu.Post.info(url).then(function(data) {
        if (data.content) {
          var text = toMarkdown(data.content);
          var result = {
            html: data.content,
            markdown: text
          }
          res.json(result);

        } else {
          throw new Error('zhihu data is error!');
        }
      }).catch(function(err) {
        res.json({
          error: 'Url is not right!'
        });
      });
    }

  }
};