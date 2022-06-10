document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const coder = document.querySelector('input').value
    try{
        const response = await fetch(`https://andy-hopkins-review-api.herokuapp.com/api/${coder}`)
        const data = await response.json()

        console.log(data)
        document.getElementById('result').innerHTML = data.text
    }catch(error){
        console.error(error)
    }
}