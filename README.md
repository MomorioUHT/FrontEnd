# Lab (FrontEnd Section)

The Lab is the coding website, perfect for schools and universites<br/>
to use it with students to assign coding task, provided with <br/>
automatic grading system powered by Antd CSS and React Framework<br/>

#### dotenv
```
REACT_APP_API_ENDPOINT={Replace with your backend's IP}
```

## Main Page
* Navigate to ```/Lab```
* create your account here
* for admins you need to create an Admin user via backend only (Not avalible through frontend)
![Login](/info-images/Login.png)

## Home Page
* view current labs that has been created
![Home page](/info-images/Homepage.png)

## Lab Page
* view tasks associated with that lab
![Lab Page](/info-images/Labpage.png)

## Task Page
* here is the task page you can view task details here
* students can write their code and submit 
* by sending the code to backend to process and return the result

```c
"P" means "Passed"
"-" means "Failed"
```
![Current Task](/info-images/Problemspage.png)

### Result Explaination
* by clicking "Result Explaination" button views the meaning and hint (in the future)
![Result Explaination](/info-images/ResultExplain.png)


## For System Administrator
### Administrator's Control Panel
* You need to have "Admin" role to access this page
* by clicking your username at the top right of the homepage brings you to Admin's panel
![Create Lab Image](/info-images/Window0.png)

### Creating Tasks
* create new task via ```/Admindashboard/CreateProblem```
![Create Lab Image](/info-images/Window1.png)

#### Example
* define testcases, use ```::TESTCASE::``` to seperate testcases
* You can write your task description in markdown language 
* Live preview of the description (on the right side)
![Create Lab Image 2](/info-images/Window2.png)

#### Test Your Code
* By Clicking "Test Run" button the test your code and view outputs
![Test Run Result](/info-images/Window4.png)

#### You did need the correct program to test your output!
![Original Code](/info-images/Window3.png)


If you think this is perfect
you can press "Save Problem" to stores the problem data in MySQL databases<br/>
and you're done! (The original code is no longer needed)


## Lab Creation
* Navigate to ```/AdminDashboard/CreateLab```
* Name Your lab and Lab ID (Required)<br/>
* Assign task into the lab by pressing "Add" button <br/>
* Sort it by the order (or whatever you prefered, manual) <br/>
![Assign Tasks](/info-images/Window5.png)
* If you does not want some task you can just press "Remove" button <br/>
![Assign Tasks](/info-images/Window6.png)

Press "Create Lab" button to finish creating your Lab!

## Lab Management
* Navigate to ```/AdminDashboard/ManageLabs```
* You can view the lab information and be able to delete the lab here
![alt text](/info-images/Window7.png)
* By clicking on the lab name, you can view the students progress for current lab (Submission result)
![alt text](/info-images/Window8.png)

---