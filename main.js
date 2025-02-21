

function QuestionReponse(tableauInitial) {
    let tableaurandom = tableauInitial
    let tableausearch = tableauInitial

    function random() {
        const indexrandom = Math.floor(Math.random() * (tableaurandom.length - 0) + 0);
        const recuprandom = tableaurandom[indexrandom];
        tableaurandom = tableaurandom.filter((el) => el != recuprandom);
        return recuprandom
    }

    init();

    function init() {
        const question = document.querySelector(".question")
        const reponse = document.querySelector(".rep")
        const btn = document.querySelector('#btn-suivant')
        const recuprandom = random()
        question.innerHTML = recuprandom.question
        reponse.innerHTML = recuprandom.reponse
        if (tableaurandom == 0) {
            btn.innerHTML = "Revenir au début"
        }
        else {
            btn.innerHTML = "Question suivante"
        }
    }

    function suivant() {
        const rep1 = document.querySelector("#flip")
        rep1.classList.remove("afficherep")
        if (tableaurandom == 0) {
            tableaurandom = tableauInitial
        }
        init()
    }

    function search(valeur) {
        if (valeur.length == 0) {
            tableausearch = tableauInitial
        }
        else {
            tableausearch = tableauInitial.filter(el => el.question.toLowerCase().includes(valeur.toLowerCase()))
        }
        initliste()
    }





    function afficherrep() {
        const rep1 = document.querySelector("#flip")
        const btnafficher = document.querySelector("#btn-afficher")
        if (rep1.classList.contains("afficherep")) {
            rep1.classList.remove("afficherep")
            btnafficher.innerHTML = "Afficher la réponse"
        }
        else {
            rep1.classList.add("afficherep")
            btnafficher.innerHTML = "Revoir la question"
        }
    }

    initliste()

    function initliste() {
        const ul = document.querySelector("#listeQ")
        ul.innerHTML = ""
        const tableauSort = tableausearch.sort((a, b) => {
            const questionA = a.question.toUpperCase();
            const questionB = b.question.toUpperCase();
            if (questionA < questionB) {
                return -1
            }
            if (questionA > questionB) {
                return 1
            }
            return 0
        })
        for (const el of tableauSort) {
            const li = document.createElement("li")
            const question = el.question.replace(/<[^>]*>/g, "")
            li.innerText = question
            li.onclick = () => {
                const question = document.querySelector(".question")
                const reponse = document.querySelector(".rep")
                question.innerHTML = el.question
                reponse.innerHTML = el.reponse
                const liActive = document.querySelector("li.active")
                if (liActive) {
                    liActive.classList.remove("active")
                }
                li.classList.add("active")
            }
            ul.append(li)
        }
    }

    return { suivant, afficherrep, search }
}