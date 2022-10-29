// Api of specific student:
// https://capsules7.herokuapp.com/api/user/:id

// Api of each group:
// can be: one / two
// https://capsules7.herokuapp.com/api/group/:number

// ------Selectors----- //
const table = document.querySelector(".table");
const input = document.querySelector("input");

// -------------generic function to fetch data from url--------------------------------//
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("ERROR", e);
  }
};

//-------------------function to get students full name and id----------------------//

let allStudents = [];

async function allData() {
  const group1 = await fetchData(
    "https://capsules7.herokuapp.com/api/group/one"
  );
  const group2 = await fetchData(
    "https://capsules7.herokuapp.com/api/group/two"
  );
  const data = group1.concat(group2);

  for (let i = 0; i < data.length; i++) {
    const student = data[i].id;
    // todo - dont do await inside loop
    const studentData = await fetchData(
      `https://capsules7.herokuapp.com/api/user/${student}`
    );
    allStudents.push(studentData);
  }
}

const main = async () => {
  await allData();
  await paintPage(
    allStudents.sort((s1, s2) => {
      if (s1.id > s2.id) {
        return 1;
      } else {
        return -1;
      }
    })
  );
};

main();

// ------------------function to dynamicaly create a table and insert the info----------------------------//
const paintPage = async (arr) => {
  const columns = ["id", "firstName", "lastName", "hobby", "gender"];
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < columns.length; j++) {
      const cell = document.createElement("div");
      cell.textContent = arr[i][columns[j]];
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
};

//  -----------------------function that allows to search for specific data about students--------------------//
// todo - make search button/on keyup

// input.addEventListener("input");

function searchData(e, property) {
  let text = e.target.value;
  const filtered = arr.filter((element) => element[property].includes(text));
  paintPage(filtered);
}
