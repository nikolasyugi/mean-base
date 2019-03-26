module.exports = function (schemas) {

    var Faq = schemas.Faq;

    return {

        getFaqs: function (req, res) {

            Faq.find({}, function (err, faqs) {
                if (err) throw err;
                else {
                    array = []
                    faqs.forEach(u => {
                        array.push(u.mapFaq())
                    });
                    res.json(array);
                }
            });
        },

        getFaq: function (req, res) {

            Faq.findOne({_id: req.params.id }, function (err, faq) {
                if (err) throw err;
                else {
                    if (!faq) return res.status(404).json({ err: "Faq not found" })
                    else res.json(faq.mapFaq());
                }
            });
        },

        createFaq: function (req, res) {

            var u = new Faq({
                position: req.body.position,
                question: req.body.question,
                answer: req.body.answer,
            })

            u.save(function (err, faq) {
                if (err) throw err;
                else res.send(faq.mapFaq());
            });
        },

        updateFaq: function (req, res) {
            Faq.findOne({_id: req.params.id }, function (err, faq) {
                if (err) throw err;
                else {
                    if (!faq) return res.status(404).json({ err: "Faq not found" })
                    else {
                        faq.position = req.body.position;
                        faq.question = req.body.question;
                        faq.answer = req.body.answer;
                    }
                    faq.save(function (err, faqUpdated) {
                        if (err) throw err;
                        else res.send(faqUpdated.mapFaq());
                    });
                }
            });
        },

        deleteFaq: function (req, res) {

            Faq.findOneAndDelete({_id: req.params.id }, function (err, faq) {
                if (err) throw err;
                else res.send({});
            });
        },

    }
}