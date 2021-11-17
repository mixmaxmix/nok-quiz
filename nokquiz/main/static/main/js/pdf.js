const saveBtn = document.querySelector('.saveBtn');
// const page = document.querySelector('#page');
const main = document.querySelector('main');



saveBtn.addEventListener('click', function() {
    const nameVal = document.querySelector('.name').value;
    const lastnameVal = document.querySelector('.lastname').value;
    console.log(nameVal);
    console.log(lastnameVal);
    if(nameVal == '' || lastnameVal == '') {
        alert('Заполните все поля')
    } else {
        main.innerHTML = 
        `
            <button class="page-download">Загрузить файл</button>
            <div id="page">
                <h1 class="page-title page-center">Поздравляем!</h1>
                <p class="page-text page-center">У вас получилось сдать тест.</p>
                <div class="page-break"></div>
                <h3 class="page-text">Имя: ${nameVal}</h3>
                <h3 class="page-text">Фамилия: ${lastnameVal}</h3>
                <p class="page-warning">Это тестовый документ. Он не является юридическим документом</p>
            </div>
        `
        generatePDF();
        document.querySelector('.page-download').addEventListener('click', generatePDF)
    }
    
})

function generatePDF() {
    const page = document.getElementById('page');

    html2pdf(page, {
        filename:   'result.pdf',
        image:  { type: 'png', quality: 0.98 },
    });
}