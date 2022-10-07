//using a dispatch table to generate employee cards
//first time using these so I've just built the functions inside the table
//if all goes well I could seperate them out 
let dispatchTable = {
    Engineer: function (engineer) {
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
                                <td>${engineer.name}</td>
                            </tr>
                            <tr>
                                <th>ID</th>
                                <td>${engineer.id}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td> <a href="mailto:${engineer.email}">${engineer.email}</a></td>
                            </tr>
                            <tr>
                                <th>Github</th>
                                <td><a href="https://github.com/${engineer.github}">${engineer.github}</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </div>
        </div>`
    },

    Intern: function (intern) {
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
                                <td>${intern.name}</td>
                            </tr>
                            <tr>
                                <th>ID</th>
                                <td>${intern.id}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td> <a href="mailto:${intern.email}">${intern.email}</a></td>
                            </tr>
                            <tr>
                                <th>School</th>
                                <td>${intern.school}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </div>
        </div>`
    },

    Manager: function (manager) {
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
                                <td>${manager.name}</td>
                            </tr>
                            <tr>
                                <th>ID</th>
                                <td>${manager.id}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td> <a href="mailto:${manager.email}">${manager.email}</a></td>
                            </tr>
                            <tr>
                                <th>Office #</th>
                                <td>${manager.office}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </div>
        </div>`
 }
}
//the meat of this whole page is this function
//array of team member objects passed in from script.js
function createHTML(team) {
    //empty array to populate with the returned employee cards (html strings)
    let completedTeam = []

    //for each employee object in the team
    team.forEach(genCard);

    function genCard(member){
        //get the employee role (which will serve as dispatch table key)
        let type = member.getRole();
        //call the command to gen the correct card
        //(employee obj passed in to access values)
        let card = dispatchTable[type](member)
        //push the card returned to the array created earlier
        completedTeam.push(card)
    }
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