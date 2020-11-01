var range = document.getElementById('range');
var navbar = document.getElementById('navbar');
var minimum = document.getElementById('minimum');
var btnNext = document.getElementById('check_minimum');
var select = document.getElementById('title-selection');
var btnScrollToEnd = document.getElementById('scrl-btn-end');
var navbarHideBtn = document.getElementById('navbar-close');
var btnScrollToNext = document.getElementById('scrl-btn-next');
var btnScrollToPrev = document.getElementById('scrl-btn-prev');
var btnScrollToStart = document.getElementById('scrl-btn-start');

var text = "";
var title = "";
var offset = 20;
var prec = 0.5;
var selectStart = 0;
var minChecked = false;
var originalArticleData = [];
var processedArticleData = [];
var recommendedArticleData = [];
var otherOriginalArticleData = [];
var otherRecommendedArticleData = [];

function onOptionChange(data) {
  var option = processedArticleData.find(d => d.title == data);
  processData(option);
}

function insertTextContent(elementId, data = "") {
  var node = document.getElementById(elementId);
  node.innerHTML = data;
}

function insertSpace(data) {
  return data.replace(/@{2}/g, "__");
}

btnScrollToPrev.addEventListener('click', function() {
  selectStart = selectStart - 20;
  if(selectStart < 0) {
    selectStart = processedArticleData.length - 20;
  }
  insertOptions();
});

function setPrec(value) {
  prec = value;
  document.getElementById('range-value').textContent = value;
}

navbarHideBtn.addEventListener('click', function() {
  navbar.classList.toggle('active');
});

minimum.addEventListener('change', function() {
  minChecked = !minChecked;
  var node = document.getElementById("original-labels");
  node.innerHTML = "";
  if(minChecked) {
    for(let i = 0; i < originalArticleData.length && i < 3; i++) {
      node.appendChild(appendList(originalArticleData[i]));
    }

    for(let i = 3; i < originalArticleData.length; i++) {
      if(originalArticleData[i].prec !== undefined) {
        if(originalArticleData[i].prec >= prec) {
          node.appendChild(appendList(originalArticleData[i]));
        }
      } else {
        node.appendChild(appendList(originalArticleData[i]));
      }
    }
  } else {
    for(let i = 0; i < originalArticleData.length; i++) {
      if(originalArticleData[i].prec !== undefined) {
        if(originalArticleData[i].prec >= prec) {
          node.appendChild(appendList(originalArticleData[i]));
        }
      } else {
        node.appendChild(appendList(originalArticleData[i]));
      }
    }
  }

  var node = document.getElementById("recommended-labels");
  node.innerHTML = "";
  if(minChecked) {
    for(let i = 0; i < recommendedArticleData.length && i < 3; i++) {
      node.appendChild(appendList(recommendedArticleData[i]));
    }

    for(let i = 3; i < recommendedArticleData.length; i++) {
      if(recommendedArticleData[i].prec !== undefined) {
        if(recommendedArticleData[i].prec >= prec) {
          node.appendChild(appendList(recommendedArticleData[i]));
        }
      } else {
        node.appendChild(appendList(recommendedArticleData[i]));
      }
    }
  } else {
    for(let i = 0; i < recommendedArticleData.length; i++) {
      if(recommendedArticleData[i].prec !== undefined) {
        if(recommendedArticleData[i].prec >= prec) {
          node.appendChild(appendList(recommendedArticleData[i]));
        }
      } else {
        node.appendChild(appendList(recommendedArticleData[i]));
      }
    }
  }

  var node = document.getElementById("recommended-spec-labels");
  node.innerHTML = "";
  if(minChecked) {
    for(let i = 0; i < otherRecommendedArticleData.length && i < 3; i++) {
      node.appendChild(appendList(otherRecommendedArticleData[i]));
    }

    for(let i = 3; i < otherRecommendedArticleData.length; i++) {
      if(otherRecommendedArticleData[i].prec !== undefined) {
        if(otherRecommendedArticleData[i].prec >= prec) {
          node.appendChild(appendList(otherRecommendedArticleData[i]));
        }
      } else {
        node.appendChild(appendList(otherRecommendedArticleData[i]));
      }
    }
  } else {
    for(let i = 0; i < otherRecommendedArticleData.length; i++) {
      if(otherRecommendedArticleData[i].prec !== undefined) {
        if(otherRecommendedArticleData[i].prec >= prec) {
          node.appendChild(appendList(otherRecommendedArticleData[i]));
        }
      } else {
        node.appendChild(appendList(otherRecommendedArticleData[i]));
      }
    }
  }

  var node = document.getElementById("original-spec-labels");
  node.innerHTML = "";
  if(minChecked) {
    for(let i = 0; i < otherOriginalArticleData.length && i < 3; i++) {
      node.appendChild(appendList(otherOriginalArticleData[i]));
    }

    for(let i = 3; i < otherOriginalArticleData.length; i++) {
      if(otherOriginalArticleData[i].prec !== undefined) {
        if(otherOriginalArticleData[i].prec >= prec) {
          node.appendChild(appendList(otherOriginalArticleData[i]));
        }
      } else {
        node.appendChild(appendList(otherOriginalArticleData[i]));
      }
    }
  } else {
    for(let i = 0; i < otherOriginalArticleData.length; i++) {
      if(otherOriginalArticleData[i].prec !== undefined) {
        if(otherOriginalArticleData[i].prec >= prec) {
          node.appendChild(appendList(otherOriginalArticleData[i]));
        }
      } else {
        node.appendChild(appendList(otherOriginalArticleData[i]));
      }
    }
  }
});

btnScrollToEnd.addEventListener('click', function() {
  selectStart = processedArticleData.length - 20;
  insertOptions();
});

function fetchData(url = 'data.txt') {
  fetch(url)
    .then((response) => response.text())
    .then((text) => text.split('\n'))
    .then((text) => text.map((line) => line.split('$$$')))
    .then((text) => {
      let tempObj = {};
      let indx = 0;
      text.forEach((line) => {
        tempObj.recommendedSpec = line[1];
        tempObj.recommended = line[0];
        tempObj.original = line[2];
        tempObj.title = line[3];
        tempObj.text = line[4];
        tempObj.id = indx++;

        processedArticleData.push(tempObj);
        tempObj = {};
      });
      insertOptions();
    });
};

btnScrollToStart.addEventListener('click', function() {
  selectStart = 0;
  insertOptions();
});

btnScrollToNext.addEventListener('click', function() {
  selectStart = selectStart + 20;
  if(selectStart + offset >= processedArticleData.length) {
    selectStart = 0;
  }
  insertOptions();
});

function insertOptions() {
  select.innerHTML = "";
  processedArticleData.map((data, index) => {
    if(index >= selectStart && index < (selectStart + offset)) {
      let option = document.createElement('option');
      option.innerText = data.title;
      option.value = data.title;
      select.appendChild(option);
    }
  });
  select.selectedIndex = 0;
  onOptionChange(select.value);
};

range.addEventListener('change', function(event) {
  setPrec(event.target.value);
  var node = document.getElementById("original-labels");
  node.innerHTML = "";
  if(minChecked) {
    for(let i = 0; i < originalArticleData.length && i < 3; i++) {
      node.appendChild(appendList(originalArticleData[i]));
    }

    for(let i = 3; i < originalArticleData.length; i++) {
      if(originalArticleData[i].prec !== undefined) {
        if(originalArticleData[i].prec >= prec) {
          node.appendChild(appendList(originalArticleData[i]));
        }
      } else {
        node.appendChild(appendList(originalArticleData[i]));
      }
    }
  } else {
    for(let i = 0; i < originalArticleData.length; i++) {
      if(originalArticleData[i].prec !== undefined) {
        if(originalArticleData[i].prec >= prec) {
          node.appendChild(appendList(originalArticleData[i]));
        }
      } else {
        node.appendChild(appendList(originalArticleData[i]));
      }
    }
  }

  var node = document.getElementById("recommended-labels");
  node.innerHTML = "";
  if(minChecked) {
    for(let i = 0; i < recommendedArticleData.length && i < 3; i++) {
      node.appendChild(appendList(recommendedArticleData[i]));
    }

    for(let i = 3; i < recommendedArticleData.length; i++) {
      if(recommendedArticleData[i].prec !== undefined) {
        if(recommendedArticleData[i].prec >= prec) {
          node.appendChild(appendList(recommendedArticleData[i]));
        }
      } else {
        node.appendChild(appendList(recommendedArticleData[i]));
      }
    }
  } else {
    for(let i = 0; i < recommendedArticleData.length; i++) {
      if(recommendedArticleData[i].prec !== undefined) {
        if(recommendedArticleData[i].prec >= prec) {
          node.appendChild(appendList(recommendedArticleData[i]));
        }
      } else {
        node.appendChild(appendList(recommendedArticleData[i]));
      }
    }
  }

  var node = document.getElementById("recommended-spec-labels");
  node.innerHTML = "";
  if(minChecked) {
    for(let i = 0; i < otherRecommendedArticleData.length && i < 3; i++) {
      node.appendChild(appendList(otherRecommendedArticleData[i]));
    }

    for(let i = 3; i < otherRecommendedArticleData.length; i++) {
      if(otherRecommendedArticleData[i].prec !== undefined) {
        if(otherRecommendedArticleData[i].prec >= prec) {
          node.appendChild(appendList(otherRecommendedArticleData[i]));
        }
      } else {
        node.appendChild(appendList(otherRecommendedArticleData[i]));
      }
    }
  } else {
    for(let i = 0; i < otherRecommendedArticleData.length; i++) {
      if(otherRecommendedArticleData[i].prec !== undefined) {
        if(otherRecommendedArticleData[i].prec >= prec) {
          node.appendChild(appendList(otherRecommendedArticleData[i]));
        }
      } else {
        node.appendChild(appendList(otherRecommendedArticleData[i]));
      }
    }
  }

  var node = document.getElementById("original-spec-labels");
  node.innerHTML = "";
  if(minChecked) {
    for(let i = 0; i < otherOriginalArticleData.length && i < 3; i++) {
      node.appendChild(appendList(otherOriginalArticleData[i]));
    }

    for(let i = 3; i < otherOriginalArticleData.length; i++) {
      if(otherOriginalArticleData[i].prec !== undefined) {
        if(otherOriginalArticleData[i].prec >= prec) {
          node.appendChild(appendList(otherOriginalArticleData[i]));
        }
      } else {
        node.appendChild(appendList(otherOriginalArticleData[i]));
      }
    }
  } else {
    for(let i = 0; i < otherOriginalArticleData.length; i++) {
      if(otherOriginalArticleData[i].prec !== undefined) {
        if(otherOriginalArticleData[i].prec >= prec) {
          node.appendChild(appendList(otherOriginalArticleData[i]));
        }
      } else {
        node.appendChild(appendList(otherOriginalArticleData[i]));
      }
    }
  }
});

function processData(data) {
  recommendedArticleData = [];
  otherRecommendedArticleData = [];
  originalArticleData = [];
  otherOriginalArticleData = [];
  let tempObj = {};

  var recommended = data.recommended.split(' '); 
  var recommendedSpec = data.recommendedSpec.split(' '); 
  var original = data.original.split(' ');
  text = data.text;
  title = data.title;
  
  recommended.forEach(item => {
    if(item.trim().startsWith('__label__')) {
      tempObj.label = insertSpace(item.replace("__label__", ""));
    }else if(item != "") {
      tempObj.prec = item.trim();
      recommendedArticleData.push(tempObj);
      tempObj = {};
    }
  });

  recommendedSpec.forEach(item => {
    if(item.trim().startsWith('__label__')) {
      tempObj.label = insertSpace(item.replace("__label__", ""));
    }else if(item != "") {
      tempObj.prec = item.trim();
      otherRecommendedArticleData.push(tempObj);
      tempObj = {};
    }
  });
  original.forEach(item => {
    if(item.trim().startsWith('__label__')) {
      tempObj.label = insertSpace(item.replace("__label__", ""));
      originalArticleData.push(tempObj);
      tempObj = {};
    }else if(item != "") {
      tempObj.label = insertSpace(item);
      otherOriginalArticleData.push(tempObj);
      tempObj = {};
    }
  });
  
  insertTextContent("text-content", text);

  var node = document.getElementById("original-labels");
  node.innerHTML = "";
  if(minChecked) {
    for(let i = 0; i < originalArticleData.length && i < 3; i++) {
      node.appendChild(appendList(originalArticleData[i]));
    }

    for(let i = 3; i < originalArticleData.length; i++) {
      if(originalArticleData[i].prec !== undefined) {
        if(originalArticleData[i].prec >= prec) {
          node.appendChild(appendList(originalArticleData[i]));
        }
      } else {
        node.appendChild(appendList(originalArticleData[i]));
      }
    }
  } else {
    for(let i = 0; i < originalArticleData.length; i++) {
      if(originalArticleData[i].prec !== undefined) {
        if(originalArticleData[i].prec >= prec) {
          node.appendChild(appendList(originalArticleData[i]));
        }
      } else {
        node.appendChild(appendList(originalArticleData[i]));
      }
    }
  }

  var node = document.getElementById("recommended-labels");
  node.innerHTML = "";
  if(minChecked) {
    for(let i = 0; i < recommendedArticleData.length && i < 3; i++) {
      node.appendChild(appendList(recommendedArticleData[i]));
    }

    for(let i = 3; i < recommendedArticleData.length; i++) {
      if(recommendedArticleData[i].prec !== undefined) {
        if(recommendedArticleData[i].prec >= prec) {
          node.appendChild(appendList(recommendedArticleData[i]));
        }
      } else {
        node.appendChild(appendList(recommendedArticleData[i]));
      }
    }
  } else {
    for(let i = 0; i < recommendedArticleData.length; i++) {
      if(recommendedArticleData[i].prec !== undefined) {
        if(recommendedArticleData[i].prec >= prec) {
          node.appendChild(appendList(recommendedArticleData[i]));
        }
      } else {
        node.appendChild(appendList(recommendedArticleData[i]));
      }
    }
  }

  var node = document.getElementById("recommended-spec-labels");
  node.innerHTML = "";
  if(minChecked) {
    for(let i = 0; i < otherRecommendedArticleData.length && i < 3; i++) {
      node.appendChild(appendList(otherRecommendedArticleData[i]));
    }

    for(let i = 3; i < otherRecommendedArticleData.length; i++) {
      if(otherRecommendedArticleData[i].prec !== undefined) {
        if(otherRecommendedArticleData[i].prec >= prec) {
          node.appendChild(appendList(otherRecommendedArticleData[i]));
        }
      } else {
        node.appendChild(appendList(otherRecommendedArticleData[i]));
      }
    }
  } else {
    for(let i = 0; i < otherRecommendedArticleData.length; i++) {
      if(otherRecommendedArticleData[i].prec !== undefined) {
        if(otherRecommendedArticleData[i].prec >= prec) {
          node.appendChild(appendList(otherRecommendedArticleData[i]));
        }
      } else {
        node.appendChild(appendList(otherRecommendedArticleData[i]));
      }
    }
  }

  var node = document.getElementById("original-spec-labels");
  node.innerHTML = "";
  if(minChecked) {
    for(let i = 0; i < otherOriginalArticleData.length && i < 3; i++) {
      node.appendChild(appendList(otherOriginalArticleData[i]));
    }

    for(let i = 3; i < otherOriginalArticleData.length; i++) {
      if(otherOriginalArticleData[i].prec !== undefined) {
        if(otherOriginalArticleData[i].prec >= prec) {
          node.appendChild(appendList(otherOriginalArticleData[i]));
        }
      } else {
        node.appendChild(appendList(otherOriginalArticleData[i]));
      }
    }
  } else {
    for(let i = 0; i < otherOriginalArticleData.length; i++) {
      if(otherOriginalArticleData[i].prec !== undefined) {
        if(otherOriginalArticleData[i].prec >= prec) {
          node.appendChild(appendList(otherOriginalArticleData[i]));
        }
      } else {
        node.appendChild(appendList(otherOriginalArticleData[i]));
      }
    }
  }
}

function appendList(data) {
  let list = document.createElement('li');
  if (data.prec !== undefined) {
    list.textContent = `${data.label} ${data.prec}`;
  }else {
    list.textContent = data.label;
  }
  return list;
}

select.addEventListener('change', function(event) {
  onOptionChange(event.target.value)
});

(function () {
  fetchData();
  setPrec(range.value);
})();