
const mailTemplate  = (username, mainMessage, information) => {
    const template =  `<h5>Hello ${username},</h5>
    <div><i>Greetings of the day!</i><div>
    <div>
        ${mainMessage}
    </div>
    <div>
       ${information}
    </div>
    <div>
        <img src="https://thumbs.dreamstime.com/b/thank-you-note-18663294.jpg" alt="Girl in a jacket" width="100" height="100">
    </div>`

    return template;
}

module.exports = {mailTemplate};


                                   