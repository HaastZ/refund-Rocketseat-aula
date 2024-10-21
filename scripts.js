// selecionando os elementos do formulario
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// selecionando os elementos da lista
const expenseList = document.querySelector("ul")

amount.oninput = () => {
    // Obtém o valor do input e remove os caracteres não numéricos
    let value = amount.value.replace(/\D/g, "")

    // Transforma o valor em centavos( exemplo: 150 / 100 = 1.5 que é equivalente a R$ 1,50)
    value = Number(value) / 100

    // Atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // Formata o valor no padrão BRL (Real Brasileiro)
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value
}

// Captura o evendo de submit do formulario para obter os valores
form.onsubmit = (event) => {
    // Previne o comportamento padrão de recarregar a pagina
    event.preventDefault()


    // Cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
        // Cria o elemento para adicionar o item ( li ) na lista ( ul )
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", `${newExpense.category_name}`)

        // Cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona nome e categoria na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)

        // Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        // Cria o icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")
        removeIcon.classList.add("remove-icon")

        // adiciona as informações no item ( na li )
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // adiciona o item na lista
        expenseList.append(expenseItem)
        
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas")
        console.log(error);
    }
}