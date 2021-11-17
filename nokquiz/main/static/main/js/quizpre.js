const DATAS = [
    {
      q:'Сколько было вопрос в предедущем тесте?',
      options: ['5 (правильный ответ)', '7', '9', '2'],
      answer: 0
    },
     {
      q:'Кто CEO в компании Apple inc.?',
      options: ['Стив Джобс', 'Тим Кук (правильный ответ)', 'Курт Кобейн', 'Тигран Худавердян'],
      answer: 1
    },
     {
      q:'Самая крупная IT компания в истории?',
      options: ['Aliexpress', 'Yandex', 'Microsoft (правильный ответ)', 'Google'],
      answer: 2
    },
     {
      q:'Крупнейшая IT компания?',
      options: ['Microsoft', 'Amazon Inc', 'Nvidia', 'Apple inc (правильный ответ)'],
      answer: 3
    },
     {
      q:'Самых высокие горы мира?',
      options: ['Аннапурна', 'Эверест (правильный ответ)', 'Броуд-Пик', 'Гималаи'],
      answer: 1
    },
    {
     q:'Тестовый вопрос, правильный ответ 2?',
     options: ['Тест', 'Тест2 (правильный ответ)', 'Тест3', 'Тест4'],
     answer: 1
   }
  ]
  
  
  
  
  
  const questionNumber = document.querySelector('.questions-number'),
    questionText = document.querySelector('.questions-text'),
    optionContainer = document.querySelector('.option-conteiner'),
    indicatorContainer = document.querySelector('.answers-indicator'),
    homeContainer = document.querySelector('.home-conteiner'),
    quizContainer = document.querySelector('.quiz-conteiner'),
    btns = document.querySelector('.btns-container');
    resultContainer = document.querySelector('.result-conteiner');
    btnNext = document.querySelector('#next');
    btnAgain = document.querySelector('#tryAgain');
    btnMain = document.querySelector('#goMain');
    btnStart = document.querySelector('#startQuiz');
  
  let questionCounter = 0;
  let currentQuestion;
  let availableQuestion = [];
  let availableOption = [];
  let correctAnswer = 0;
  let attempt = 0;
  
  
  btnNext.addEventListener('click', getNext);
  btnAgain.addEventListener('click', tryAgain);
  btnMain.addEventListener('click', goMain);
  btnStart.addEventListener('click', startQuiz);
  
  
  function getNext(){
    if(questionCounter === DATAS.length){
      console.log("over")
      quizOver();
    } else{
      getNewQuestion()
    }
  }
  
  function resetQuiz(){
    questionCounter = 0;
    correctAnswer = 0;
    attempt = 0;
    indicatorContainer.innerHTML = ``;
  }
  
  
  function tryAgain(){
    resultContainer.classList.add('hide')
  
    quizContainer.classList.remove('hide')
    resetQuiz()
    startQuiz()
  }
  
  
  function goMain(){
    resultContainer.classList.add('hide')
  
    homeContainer.classList.remove('hide')
    resetQuiz()
  }
  
  
  function quizOver(){
    quizContainer.classList.add('hide')
  
    resultContainer.classList.remove('hide')
    quizResult()
  }
  
  function quizResult(){
    resultContainer.querySelector('.total-questions').innerHTML = DATAS.length
    resultContainer.querySelector('.total-attemp').innerHTML = attempt;
    resultContainer.querySelector('.total-correct').innerHTML = correctAnswer
    resultContainer.querySelector('.total-wrong').innerHTML = attempt - correctAnswer
    // const persent = (correctAnswer/DATAS.length) * 100 
    // resultContainer.querySelector('.total-percentage').innerHTML = persent.toFixed() + '%'
    resultContainer.querySelector('.total-percentage').innerHTML = (correctAnswer/DATAS.length) * 100  + '%'
    resultContainer.querySelector('.total-score').innerHTML = `${correctAnswer} / ${DATAS.length}`
  }
  
  
  // Вставьте вопросы в "доступные" вопросы
  function setavAilableQuestion(){
    const totalQuestion = DATAS.length;
    for(let i=0; i < totalQuestion; i++){
      availableQuestion.push(DATAS[i])
    }
    // console.log(availableQuestion)
  }
  
  
  // cоздает новый вопрос
  function getNewQuestion(){
    questionNumber.innerHTML = `Вопрос ${questionCounter + 1} из ${DATAS.length}`
  
    // Случайный вопрос из массива
    const questionIndex = availableQuestion[Math.floor(Math.random() * availableQuestion.length)]
  
    currentQuestion = questionIndex; // обрати сюда внимание это важная вещь для понимание 
  
    questionText.innerHTML = currentQuestion.q
  
    const index1 = availableQuestion.indexOf(questionIndex)
    availableQuestion.splice(index1, 1)
  
    const optionLen = currentQuestion.options.length
  
    for(let i=0; i < optionLen; i++){
      availableOption.push(i)
    }
    optionContainer.innerHTML = ''
  
    for(let i=0; i < optionLen; i++){
  
      const optionIndex = availableOption[Math.floor(Math.random() * availableOption.length)]
  
      const index2 = availableOption.indexOf(optionIndex)
      availableOption.splice(index2, 1)
  
      const option = document.createElement('div');
      option.innerHTML = currentQuestion.options[optionIndex]
      option.id = optionIndex
      option.className="option"
      optionContainer.appendChild(option)
      option.setAttribute('onclick', 'getResult(this)')
  
      // option.innerHTML = `
      //     <div class="option">${currentQuestion.options[i]}</div>
      //     <div class="option">${currentQuestion.options[i]}</div>
      //     <div class="option">${currentQuestion.options[i]}</div>
      //     <div class="option">${currentQuestion.options[i]}</div>
      // `
    }
  
    questionCounter++
  }
  
  function getResult(el){
    const id = parseInt(el.id)
    if(id === currentQuestion.answer){
      el.classList.add('corrent')
      updateIndicator('corrent')
      correctAnswer++
    } else{
      el.classList.add('wrong')
      updateIndicator('wrong')
  
      const optionLen = optionContainer.children.length
      for(let i=0; i < optionLen; i++){
        if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
          optionContainer.children[i].classList.add('corrent')
        }
      }
    }
    attempt++
    if(correctAnswer == DATAS.length) {
        btns.innerHTML = 
        `
        <a href="/result" class="btn" id='goResult'>Получить сертификат</a>
        `
      }
    unclickOptions();

  }
  


  
  function unclickOptions(){
    let optionLen = optionContainer.children.length
    for(let i=0; i < optionLen; i++){
      optionContainer.children[i].classList.add("already-answered")
    }
  }
  
  function answerIndicator(){
    const totalQuestion = DATAS.length;
  
    for(let i=0; i < totalQuestion; i++){
      const indicator = document.createElement('div')
      indicatorContainer.appendChild(indicator)
    }
  }
  
  function updateIndicator(mark){
    indicatorContainer.children[questionCounter-1].classList.add(mark)
  }
  
  
  
  function startQuiz(){
  
    homeContainer.classList.add('hide')
  
    quizContainer.classList.remove('hide')
  
    // Зададим все вопросы в "доступных" запросах
    setavAilableQuestion();
  
    // Потом обратимся, чтобы получить
    getNewQuestion();
  
    answerIndicator()
  }
  
