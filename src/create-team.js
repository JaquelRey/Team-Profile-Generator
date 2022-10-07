function createEngineer(member) {
    return `
<div class="columns m-2">
    <div class="column">
        <div class="card">
            <header class="card-header has-background-info">
              <p class="card-header-title has-text-white">
                Engineer
              </p>
            </header>
            <div class="card-content is-flex is-justify-content-center">
                <table class="table">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>${member.name}</td>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <td>${member.id}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td> <a href="mailto:${member.email}">${member.email}</a></td>
                        </tr>
                        <tr>
                            <th>Github</th>
                            <td><a href="https://github.com/${member.github}">${member.github}</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
    </div>`
}

function createIntern(member) {
    return `
<div class="columns m-2">
    <div class="column">
        <div class="card">
            <header class="card-header has-background-info">
              <p class="card-header-title has-text-white">
                Intern
              </p>
            </header>
            <div class="card-content is-flex is-justify-content-center">
                <table class="table">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>${member.name}</td>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <td>${member.id}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td> <a href="mailto:${member.email}">${member.email}</a></td>
                        </tr>
                        <tr>
                            <th>School</th>
                            <td>${member.school}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
    </div>`
}

function createManager(member) {
    return `
<div class="columns m-2">
    <div class="column">
        <div class="card">
            <header class="card-header has-background-info">
              <p class="card-header-title has-text-white">
                Manager
              </p>
            </header>
            <div class="card-content is-flex is-justify-content-center">
                <table class="table">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>${member.name}</td>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <td>${member.id}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td> <a href="mailto:${member.email}">${member.email}</a></td>
                        </tr>
                        <tr>
                            <th>Office #</th>
                            <td>${member.office}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
    </div>`
}



//empty array for the returned card html
let completedTeam = []

function genCard(member) {

    //attempt to use a dispatch table to generate employee cards
    let dispatchTable = {
        Engineer: createEngineer(member),

        Intern: createIntern(member),

        Manager: createManager(member)
    }


    //get the employee role (will serve as dispatch table key)
    let type = member.getRole();
    //generate card
    let card = dispatchTable[type](member)
    //push the card returned to the array created earlier
    completedTeam.push(card)
}

//array of team member objects passed in from script.js
async function createHTML(team) {

    //for each employee object in the team
    //generate a card
    await team.forEach((member) => {
        genCard(member)
    })

    //then return the finished html

    return fullPage(completedTeam.join(" "));
}

// slap the generated html for the employee cards into the main page and return it
const fullPage = function (cards) {
    return `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello Bulma!</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  </head>
  <body>
  <section class="hero is-info">
    <div class="hero-body has-text-centered">
      <h1 class="title">
        Hello World
      </h1>
      <p class="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
      <br>
    </div> </section>

    <div class="columns m-2">

    ${cards}
    
    </div>

  </body>
</html>`
}


module.exports = createHTML();