const form = document.forms.formTest;
const btn = document.querySelector('.specialBtn');
const respTxt = document.querySelector('.resttext');


async function loadData(data) {
  try {
    const response = await axios.post('/post', data);
    const dataRes = response.data;
    console.log(dataRes);
    if (dataRes.valid) {
      form.name.value = '';
    }
    respTxt.innerText = dataRes.status;
    btn.classList.remove('disabled');
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  btn.classList.add('disabled');
  const data = new FormData(form);
  loadData(data);
});
