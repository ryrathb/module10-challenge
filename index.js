const Manager = require("./library/Manager.js");
const Engineer = require("./library/Engineer.js");
const Intern = require("./library/Intern.js");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const genTeam = require("./source/template.js")

teamRay = [];


function runApp () {

    function createTeam () {
        inquirer.prompt([{
            type: "list",
            message: "What type of employee would you like to add to your team?",
            name: "additionalEmployeePrompt",
            choices: ["Manager", "Engineer", "Intern", "No more team members necessary."]
        }])
        .then(function (userInp) {
            switch(userInp.additionalEmployeePrompt) {
                case "Manager":
                    addMan()
                    break;
                case "Engineer":
                    addEng()
                    break;
                case "Intern":
                    addInt()
                    break;

                default:
                    htmlBuilder();
            }
        })
    }

    function addManager() {
        inquirer.prompt ([

            {
                type: "input",
                name: "managerName",
                message: "What is the manager's name?"
            },

            {
                type: "input",
                name: "managerID",
                message: "What is the manager's employee ID number?"
            },

            {
                type: "input",
                name: "managerEmail",
                message: "What is the manager's email address"
            },

            {
                type: "input",
                name: "managerOffNum",
                message: "What is the manager's office number?"
            }
        ])
        .then(answers => {
            const manager = new Manager(answers.managerName, answers.Manager, answers.managerEmail, answers.managerOffNum);
            teamRay.push(manager);
            createTeam();
        });

    }

    function addEng() {

    }

    function addInt() {

    }

    function htmlBuilder () {
        console.log("Team created successfully!");
        fs.writeFileSync(outputPath, genTeam(teamRay), "UTF=8");
    }

    createTeam();
}

runApp();