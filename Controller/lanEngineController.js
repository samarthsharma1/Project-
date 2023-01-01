// importing translation table from db
const Dictionary = require('../Model/Translation');
const { Op } = require('sequelize')

const { Translate } = require('@google-cloud/translate').v2;

// instantiate client
const translate = new Translate()

exports.translateWord = async (req, res, next) => {
    const { sourceText,sourceLang,targetLang } = req.body;

    try {

        const result = await translate.translate(sourceText, {
            from: sourceLang, to: targetLang
        });

        console.log(result)
        const targetText = result[0]

        res.json({fron:sourceText,to:targetText})

        storeInDatabase(sourceText,sourceLang,targetText,targetLang)

    } catch (err) {
        console.log('==> from translation', err)
        res.send('oops! pls provide currect language codes')
    }
}

async function storeInDatabase(sourceText,sourceLang,targetText,targetLang) {
    try {
        const result = await Dictionary.create({
            sourceLang,
            sourceText,
            targetLang,
            targetText
        })

        // console.log(result)
    } catch (err) {
        console.log('==> from database insertion', err)
    }
}


// search in db
exports.searchDb = async (req, res, next) => {
    const { sourceText,sourceLang,targetLang } = req.body;
    try {

        // find match the source text from ( sourceText || targetText) in row
        // find match the source lang from ( sourceLang || targetLang) in row
        // find the target lang from (sourceLang || targetLang) in row

        if (sourceLang===targetLang) {
            res.json({from:text,to:text,msg:'pls change any one translate language'})
        }
        else {
            
            const database_result = await Dictionary.findOne({
                where: {
                    [Op.and]: [
                        {[Op.or]: [{ sourceText }, { targetText: sourceText }]},
                        {[Op.or]: [{ sourceLang }, { targetLang: sourceLang }]},
                        {[Op.or]: [{ sourceLang: targetLang},{targetLang}]}
                    ]
                }
            })
            if (database_result) {
                
                if (database_result.sourceText === sourceText) {
                    res.json({from:sourceText, to:database_result.targetText})
                } else {
                    res.json({
                        from: database_result.targetText,
                        to: database_result.sourceText,
                        msg:'from database'
                    })
                }
            } else {
                next();
            }
        }


    } catch (err) {
        res.send(err)
    }
}