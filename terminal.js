$(function() {
  
    $('.prompt').html('root@haddadi:~# ');

  var term = new Terminal('#input-line .cmdline', '#container output');
  term.init();
  
});

var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);
};

var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);

  const CMDS_ = [
    'whoami', 'education', 'experience', 'certifications', 'projects', 'interests', 'voluntary' ,'contact', 'help' 
  ];
  
  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function(e) {
    cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  //
  function inputTextClick_(e) {
    this.value = this.value;
  }

  //
  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value; 
      }
    }
  }

  //
  function processNewCommand_(e) {

    if (e.keyCode == 9) { // tab
      e.preventDefault();
    } else if (e.keyCode == 13) { // enter
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }

      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);

      if (this.value && this.value.trim()) {
        var args = this.value.split(' ').filter(function(val, i) {
          return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1); 
      }

      switch (cmd) {
        case 'clear':
          output_.innerHTML = '';
          this.value = '';
          return;
        case 'help':
          var result = "<h2>Help</h2><p><b>whoami</b>: Who am I ?<br><b>education</b>: display information about my education.<br><b>experience</b>: display information about my experiences.<br><b>certifications</b>: display all my certifications.<br><b>projects</b>: display information about my projects.<br><b>interests</b>: my areas of intrests ?<br><b>voluntary</b>: display my voluntary experiences.<br><b>contact</b>: wanna reach out ?<br><b>clear</b>: clear terminal<br><b>help</b>: display this menu.</p>";
          output(result);
          break;
        case 'education':
          var result = "<h3>Education</h3><p>Computer Engineering Cycle, ENSA - Tetouan. Expected 2021 <br> Preparatory Classes, ENSA - Tetouan. 2015 - 2018 <br> Baccalaureate - Mathematics, Newton International School - Mohammedia.  2014 - 2015</p>";
          output(result);
          break;
        case 'experience': Software Engineer - Part time
          var result = "<h3>Experience</h3><p> <b>Artificial Intelligence Research Intern &nbsp;&nbsp;&nbsp;Jul 2020 - Sept 2020 <br>DeepEcho &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rabat</b><br>&nbsp;&nbsp;Built, trained & deployed deep learning models for the calculation of amniotic fluid index in 2D ultrasound images. <br>&nbsp;&nbsp;Achieved 2% higher than state-of-the-art amniotic fluid pocket semantic segmentation models.<br>&nbsp;&nbsp;<b>Tech Stack :</b> OpenCV, Python, Numpy, Tensorflow, Keras, Django, AWS. <br><br <b>Software Engineer - Part time &nbsp;&nbsp;&nbsp;Jul 2020 - Sept 2020 <br>Kaktus AI &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;London - England, UK</b><br>&nbsp;&nbsp;Designed and developed an algorithm for customized questions picking per user. <br>&nbsp;&nbsp;Reduced back-end application response time by 28%.<br>&nbsp;&nbsp;<b>Tech Stack :</b> Django, Angular, Redis. <br><br><b>Software Engineering Intern &nbsp;&nbsp;&nbsp;Jul 2020 - Sept 2020 <br>ENSATé &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tetouan</b><br>&nbsp;&nbsp;Created a hospital appointment management web application. <br>&nbsp;&nbsp;Implemented machine learning algorithms for heart disease prediction.<br>&nbsp;&nbsp;Integrated a deep neural network for malaria and pneumonia medical image diagnosis.<br>&nbsp;&nbsp;<b>Tech Stack :</b> Django, Javascript, Numpy, Pandas, Matplotlib, Keras. <br><br><b>Business Intelligence Intern &nbsp;&nbsp;&nbsp;Jul 2019 - Aug 2019<br>Prometi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Casablanca</b><br>&nbsp;&nbsp;Cleaned and preprocessed sales and purchases data, and created a dashboard.<br>&nbsp;&nbsp;Created a real time visualizing dashboard for workers in function.<br><b>&nbsp;&nbsp;Tech Stack :</b> MySql, PowerBI, Dax.<p>";
          output(result);
          break;
        case 'certifications':
          var result = "<h3>Certifications</h3><p><b>Coursera Deep Learning Specialization</b><br> Rich and varied specialization that gave me knowledge of deep learning from its foundations (neural networks) to its industry applications (Computer Vision, Natural Language Processing,Speech Recognition, etc.).<br> <b>Five courses : </b><br>&nbsp;&nbsp;Neural Networks and DeepLearning<br>&nbsp;&nbsp;Improving Deep Neural Networks: Hyperparameter tuning, Regularization and Optimization<br>&nbsp;&nbsp;Structuring Machine Learning Projects<br>&nbsp;&nbsp;Convolutional NeuralNetworks<br>&nbsp;&nbsp;Sequence Models<br><br> <b>Coursera Natural Language Processing Specialization</b><br> The specialization helped me grasp state-of-the-art deep learning techniques needed to build cutting-edge NLP systems <br> <b>Four Courses : </b><br>&nbsp;&nbspNatural Language Processing with Classification and Vector Spaces<br>&nbsp;&nbspNatural Language Processing with Probabilistic Models <br>&nbsp;&nbspNatural Language Processing with Sequence Models <br>&nbsp;&nbspNatural Language Processing with Attention Models <br><br> <b>Huawei Routing & Switching Certification</b> <p>";
          output(result);
          break;
        case 'projects':
          var result = "<h3>Projects </h3><p> <b>BioTiful :</b> Django E-commerce web application developed as a volunteer for a Bio-products cooperative in the community where I did my engineering studies. . <br> <b>ClinicApp :</b> Django web application to help a medical clinic manage their appointments and assits doctors in their diagnosisis . <br> <b>MorphBot :</b> Implemented an LSTM model for rap lyrics generation in Arabic Moroccan dialect using : Scrapy to scrap the songs lyrics & Keras for the deep learning network. <br> <b> GTE-Gesture To English :</b> Trained a Vgg19 neural network to recognize sign language gestures and return the equivalent english letters using OpenCV & Keras. <br> <b>CoviZZ :</b> Built a web application for visualizing Covid19 cases in Morocco by region & city, using : SparkJava, PL/SQL, Javascript, OracleDB 18cXE. <br> <b>Minoch :</b> Text editor for Unix-like computing systems developed in C language. </p>";
          output(result);
          break;
        case 'interests': 
          var result = "<h3>Interests</h3><p>Competitive programming, machine learning, hiking, numismatics.</p>";
          output(result);
          break;
        case 'voluntary': 
          var result = "<h3>Voluntary</h3><p><b>Assistant in a blood donation caravan during weekends of Jul-Aug 2018.</b><br><b>Assistant in ’Ftour Al Amal’</b> : Assisted in preparing and providing +1200 daily meals during Ramadan 2017.</p>";
          output(result);
          break;
        case 'contact':
          var result = "<h3>Contact</h3><h4>Email: abderrahim.haddadiii@gmail.com<br><a style='text-decoration: none;' href='https://www.linkedin.com/in/abderrahim-haddadi'>LinkedIn</a> <br></h4>";
          output(result);
          break;
        case 'whoami':
          var result = "<h1>HADDADI Abderrahim</h1><p><h3>Passionate software engineering student during the day, machine learning enthusiast at nights.<br>I find pleasure in learning and helping others.<br>Curious and creative inner child takes command when facing challenges.</h3></p>"
          output(result);
          break;
        default:
          if (cmd) {
            output(cmd + ': command not found');
          }
      };

      window.scrollTo(0, getDocHeight_());
      this.value = '';
    }
  }

  //
  function formatColumns_(entries) {
    var maxName = entries[0].name;
    util.toArray(entries).forEach(function(entry, i) {
      if (entry.name.length > maxName.length) {
        maxName = entry.name;
      }
    });

    var height = entries.length <= 3 ?
        'height: ' + (entries.length * 15) + 'px;' : '';

    var colWidth = maxName.length * 7;

    return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'];
  }

  //
  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }

  function getDocHeight_() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }

  //
  return {
    init: function() {
      output('<h1>HADDADI Abderrahim</h1><h3>Passionate software engineering student during the day<br>Machine learning enthusiast at nights.<br>I find pleasure in learning and helping others.<br>Curious and creative inner child takes command when facing challenges.</h3><p>Enter "help" for more information.</p><p> -- This website is inspired by Ahmed Lekssays\'s website   </p>');
    },
    output: output
  }
};
