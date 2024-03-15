import { faker } from '@faker-js/faker';
const apiData = require("../fixtures/API-data.json");
let token;
let taskID;
let tempText;
let tempAnswer;
let tempTitle;

describe("Verify Registration endpoint", () => {
  
  it("Check the registation with POST method", () => {
    cy.request({
      method: 'POST',
      url: '/api/register',
      body: {
        "login": faker.internet.userName(),
        "email": faker.internet.email(),
        "password": "12345",
        "langKey": "en",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
    })
  })

  it("Check the registation with a used login", () => {
    cy.request({
      method: 'POST',
      url: '/api/register',
      body: {
        "login": faker.internet.userName(),
        "email": faker.internet.email(),
        "password": "12345",
        "langKey": "en",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.detail).to.eq("Login is already in use!");
    })
  })

  it("Check the registation with a used email", () => {
    cy.request({
      method: 'POST',
      url: '/api/register',
      body: {
        "login": faker.internet.userName(),
        "email": "konstantin.gdansk@gmail.com",
        "password": "asdasdasdasd",
        "langKey": "en",
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.detail).to.eq("Email is already in use!")
    })
  })

  it("Check the registation with empty fields", () => {
    cy.request({
      method: 'POST',
      url: '/api/register',
      body: {
        "login": "",
        "email": "",
        "password": "asdasdasd",
        "langKey": "en",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      let errorMessages = response.body.fieldErrors.map(function (error) {
        return error.message;
      });
      expect(errorMessages).to.include("must not be blank");
    })
  })

  it("Check the registation with invalid login length", () => {
    cy.request({
      method: 'POST',
      url: '/api/register',
      body: {
        "login": "graymorningbytheseathewindliftedthewaveshighsanddancedintheembraceoftherisingsunwhilefishermeneagerlyawaitedtheunveilingofthesestreasurestoexperiencetheunseensplendorofamomentfilledwiththescentofsaltandfreess",
        "email": faker.internet.email(),
        "password": "asdasdasd",
        "langKey": "en",
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.fieldErrors[0].message).to.eq("size must be between 1 and 50");
    })
  })

  it("Check the registation with invalid email format", () => {
    cy.request({
      method: 'POST',
      url: '/api/register',
      body: {
        "login": faker.internet.userName(),
        "email": "wrong@@email.com",
        "password": "asdasdasd",
        "langKey": "en",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.fieldErrors[0].message).to.eq("must be a well-formed email address");
    })
  })

  it("Check the registation with a short password", () => {
    cy.request({
      method: 'POST',
      url: '/api/register',
      body: {
        "login": faker.internet.userName(),
        "email": faker.internet.email(),
        "password": "a",
        "langKey": "en",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.fieldErrors[0].message).to.eql("size must be between 4 and 100") && 
      expect(response.body.fieldErrors[0].field).to.eql("password");
    })
  })
})

describe("Verify Login endpoint", () => {

  it("Check the login endpoint with student creds", () => {
    cy.request({
      method: 'POST',
      url: '/api/authenticate',
      body: {
        "username": apiData.userStudentName,
        "password": apiData.userStudentPassword,
        "rememberMe": false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.id_token;
    })
  })

  it("Check the login endpoint with teacher creds", () => {
    cy.request({
      method: 'POST',
      url: '/api/authenticate',
      body: {
        "username": apiData.userTeacherName,
        "password": apiData.userTeacherPassword,
        "rememberMe": false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.id_token;
    })
  })

  it("Check the login endpoint with empty creds", () => {
    cy.request({
      method: 'POST',
      url: '/api/authenticate',
      body: {
        "username": "",
        "password": "",
        "rememberMe": false,
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    })
  })

  it("Check the login endpoint with incorrect name", () => {
    cy.request({
      method: 'POST',
      url: '/api/authenticate',
      body: {
        "username": faker.internet.userName(),
        "password": apiData.userStudentPassword,
        "rememberMe": false,
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.detail).to.eq("Bad credentials");
    })
  })

  it("Check the login endpoint with incorrect password", () => {
    cy.request({
      method: 'POST',
      url: '/api/authenticate',
      body: {
        "username": faker.internet.userName(),
        "password": apiData.userStudentPassword,
        "rememberMe": false,
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.detail).to.eq("Bad credentials");
    })
  })

  it("Check the login endpoint with admin creds", () => {
    cy.request({
      method: 'POST',
      url: '/api/authenticate',
      body: {
        "username": apiData.adminName,
        "password": apiData.adminPassword,
        "rememberMe": false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.id_token;
    })
  })

});

describe("Verify task creation via admin", () => {

  it("Create task (smoke)", () => {
    cy.request({
      method: 'POST',
      url: '/api/tasks',
      headers: { 'Authorization': `Bearer ${token}` },
      body: {
        "text": tempText = faker.lorem.words(),
        "answer": tempAnswer = faker.lorem.words(),
        "title": tempTitle = faker.lorem.words(),
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.text).to.eq(tempText);
      expect(response.body.answer).to.eq(tempAnswer);
      expect(response.body.title).to.eq(tempTitle);
      taskID = response.body.id;
    })
  })

  it("Create task with empty fields", () => {
    cy.request({
      method: 'POST',
      url: '/api/tasks',
      headers: { 'Authorization': `Bearer ${token}` },
      body: {
        "text": tempText = "",
        "answer": tempAnswer = "",
        "title": tempTitle = "",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.text).to.eq(tempText);
      expect(response.body.answer).to.eq(tempAnswer);
      expect(response.body.title).to.eq(tempTitle);
      taskID = response.body.id;
    })
  })

  it("Create task with symbols", () => {
    cy.request({
      method: 'POST',
      url: '/api/tasks',
      headers: { 'Authorization': `Bearer ${token}` },
      body: {
        "text": tempText = "!№;%:?*()_+!@#$%^&*()_+ №;%:\\|/{}[]<>?",
        "answer": tempAnswer = "!№;%:?*()_+!@#$%^&*()_+ №;%:?*()_+!@#$%^&*()_+ \\|/{}[]<>?",
        "title": tempTitle = `${faker.datatype.number()}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.text).to.eq(tempText);
      expect(response.body.answer).to.eq(tempAnswer);
      expect(response.body.title).to.eq(tempTitle);
      taskID = response.body.id;
    })
  })

  it("Create task with mixed values", () => {
    cy.request({
      method: 'POST',
      url: '/api/tasks',
      headers: { 'Authorization': `Bearer ${token}` },
      body: {
        "text": tempText = `😀🤍${faker.datatype.number()}  ()_+ № ${faker.datatype.number()}`,
        "answer": tempAnswer = `${faker.datatype.number()}😀🤍  ()_+ № ${faker.date.recent()}Съешь ещё этих мягких французских булок, да выпей же чаю yfsdf`,
        "title": tempTitle = `   ()_+ № 🤍 ${faker.datatype.number()} 😄 ${faker.date.recent()}`
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.text).to.eq(tempText);
      expect(response.body.answer).to.eq(tempAnswer);
      expect(response.body.title).to.eq(tempTitle);
      taskID = response.body.id;
    })
  })

  it("Verify saved task data after creation", () => {
    cy.request({
      method: 'GET',
      url: `/api/tasks/${taskID}`,
      headers: { 'Authorization': `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(taskID);
      expect(response.body.text).to.eq(tempText);
      expect(response.body.answer).to.eq(tempAnswer);
      expect(response.body.title).to.eq(tempTitle);
    })
  })

});

describe("Verify task edit and del via admin", () => {
  it("Verify full edit of task data", () => {
    cy.request({
      method: 'PUT',
      url: `/api/tasks/${taskID}`,
      body: 
      {
        "id": taskID,
        "text": tempText = "<<<EDITED>>>",
        "answer": tempAnswer = " EDITED answer ",
        "title": tempTitle = " EDITED title"
      },
      headers: { 'Authorization': `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(taskID);
      expect(response.body.text).to.include("EDITED");
      expect(response.body.answer).to.include("EDITED");
      expect(response.body.title).to.include("EDITED");
    })
  })

  it("Verify partly edit of task data", () => {
    cy.request({
      method: 'PATCH',
      url: `/api/tasks/${taskID}`,
      body: 
      {
        "id": taskID,
        "answer": tempAnswer = "Patched text"
      },
      headers: { 'Authorization': `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(taskID);
      expect(response.body.answer).to.include("Patched text");
    })
  })

  it("Verify saved task data with changes", () => {
    cy.request({
      method: 'GET',
      url: `/api/tasks/${taskID}`,
      headers: { 'Authorization': `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(taskID);
      expect(response.body.text).to.eq(tempText);
      expect(response.body.answer).to.eq(tempAnswer);
      expect(response.body.title).to.eq(tempTitle);
    })
  })

  it("Verify task deletion", () => {
    cy.request({
      method: 'DELETE',
      url: `/api/tasks/${taskID}`,
      headers: { 'Authorization': `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(204);
    })
  })

  it("Verify that task is deleted", () => {
    cy.request({
      method: 'GET',
      url: `/api/tasks/${taskID}`,
      headers: { 'Authorization': `Bearer ${token}` },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.title).to.eq("Not Found");      
    })
  })
  
})

describe("Verify restricted task edit and del via non admin users", () => {
  it("Task deletion is restricted with student access", () => {// gotowo
    cy.request({
      method: 'POST',
      url: '/api/tasks',
      headers: { 'Authorization': `Bearer ${token}` },
      body: {
        "text": tempText = faker.lorem.words(),
        "answer": tempAnswer = faker.lorem.words(),
        "title": tempTitle = faker.lorem.words(),
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.text).to.eq(tempText);
      expect(response.body.answer).to.eq(tempAnswer);
      expect(response.body.title).to.eq(tempTitle);
      taskID = response.body.id;
    }).then(() => {
      cy.request({
        method: 'POST',
        url: '/api/authenticate',
        body: {
          "username": apiData.userStudentName,
          "password": apiData.userStudentPassword,
          "rememberMe": false,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        token = response.body.id_token;

        cy.request({
          method: 'DELETE',
          url: `/api/tasks/${taskID}`,
          headers: { 'Authorization': `Bearer ${token}` },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(403);
        });
      });
    });
  });

  it("Task deletion is restricted with teacher access", () => { // gotowo
    cy.request({
      method: 'POST',
      url: '/api/authenticate',
      body: {
        "username": apiData.userTeacherName,
        "password": apiData.userTeacherPassword,
        "rememberMe": false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.id_token;

      cy.request({
        method: 'DELETE',
        url: `/api/tasks/${taskID}`,
        headers: { 'Authorization': `Bearer ${token}` },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(403);
      });
    });
  });

  it("Task full edit is restricted with teacher access", () => { 
    cy.request({
      method: 'POST',
      url: '/api/authenticate',
      body: {
        "username": apiData.userTeacherName,
        "password": apiData.userTeacherPassword,
        "rememberMe": false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.id_token;

      cy.request({
        method: 'PUT',
        url: `/api/tasks/${taskID}`,
        body: 
        {
          "id": taskID,
          "text": tempText = "<<<EDITED>>>",
          "answer": tempAnswer = " EDITED answer ",
          "title": tempTitle = " EDITED title"
        },
        headers: { 'Authorization': `Bearer ${token}` },
        failOnStatusCode: false        
      }).then((response) => {
        expect(response.status).to.eq(403);
      })
    });
  });

  it("Task full edit is restricted with student access", () => {
    cy.request({
      method: 'POST',
      url: '/api/authenticate',
      body: {
        "username": apiData.userStudentName,
        "password": apiData.userStudentPassword,
        "rememberMe": false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.id_token;

      cy.request({
        method: 'PUT',
        url: `/api/tasks/${taskID}`,
        body: 
        {
          "id": taskID,
          "text": tempText = "<<<EDITED>>>",
          "answer": tempAnswer = " EDITED answer ",
          "title": tempTitle = " EDITED title"
        },
        headers: { 'Authorization': `Bearer ${token}` },
        failOnStatusCode: false        
      }).then((response) => {
        expect(response.status).to.eq(403);
      })
    });
  });

  it("Task part edit is restricted with student access", () => {
    cy.request({
      method: 'POST',
      url: '/api/authenticate',
      body: {
        "username": apiData.userStudentName,
        "password": apiData.userStudentPassword,
        "rememberMe": false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.id_token;

      cy.request({
        method: 'PATCH',
        url: `/api/tasks/${taskID}`,
        body: 
        {
          "id": taskID,
          "text": tempText = "patched text",
        },
        headers: { 'Authorization': `Bearer ${token}` },
        failOnStatusCode: false        
      }).then((response) => {
        expect(response.status).to.eq(403);
      })
    });
  });

  it("Task part edit is restricted with teacher access", () => {
    cy.request({
      method: 'POST',
      url: '/api/authenticate',
      body: {
        "username": apiData.userTeacherName,
        "password": apiData.userTeacherPassword,
        "rememberMe": false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.id_token;

      cy.request({
        method: 'PATCH',
        url: `/api/tasks/${taskID}`,
        body: 
        {
          "id": taskID,
          "text": tempText = "patched text",
        },
        headers: { 'Authorization': `Bearer ${token}` },
        failOnStatusCode: false        
      }).then((response) => {
        expect(response.status).to.eq(403);
      })
    });
  });
  
});