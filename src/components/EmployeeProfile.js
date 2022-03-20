import * as React from 'react';
import axios from 'axios';

export class EmployeeProfile extends React.Component{
    
   constructor(props) {
       super(props);
       this.state = {
           employee: Object
       }
   }

   generateEmployees() {
       fetch('http://localhost:9000/employee')
       .then(response => response.json())
       .then(response => {
           this.setState({employee : response});
           console.log(response);
       })
       .catch(error=> {console.log(error)});
   }

   

   render() {
    return (
        <div className="large-modal">
           <div className="employee-profile-left">
                <div className="employee-profile-left-top">
                    <div className="employee-profile-left-top-elements">
                        <div className="profile-image">
                            <img src ="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"/>
                        </div>
                    </div>
                    <div className="employee-profile-left-top-elements">
                        <button onClick={()=>this.generateEmployees()}>Generate Employee</button>
                    <h2>{this.state.employee.firstName} {this.state.employee.lastName}</h2>
                    </div>
                </div>
                <div className="employee-profile-left-bottom">
                    <h3>Role Preferences</h3>
                    <div className="role-preferences-container">
                        <div className="add-role-preference-container">
                            <div className="role-preference-elements">
                                <p>Role 1</p>
                                <a href="espn.com">Add a role</a>
                            </div>
                        </div>
                        <div className="add-role-preference-container">
                            <div className="role-preference-elements">
                                <p>Role 2</p>
                                <a href="espn.com">Add a role</a>
                            </div>
                        </div>
                        <div className="add-role-preference-container">
                            <div className="role-preference-elements">
                                <p>Role 3</p>
                                <a href="espn.com">Add a role</a>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
           <div className="employee-profile-right">
                <div className="employee-information-title">
                    <h3>Employee Information</h3>
                </div>
                <div className="employee-information-container">
                    <div className="role-preferences-container">
                        <div className="add-role-preference-container">
                            <div className="role-preference-elements">
                                <p>Employee Id</p>
                                <p>{this.state.employee.id}</p>
                            </div>
                        </div>
                        <div className="add-role-preference-container">
                            <div className="role-preference-elements">
                                <p>Full Name</p>
                                <p>{this.state.employee.firstName} {this.state.employee.lastName}</p>
                            </div>
                        </div>
                        <div className="add-role-preference-container">
                            <div className="role-preference-elements">
                                <p>Email</p>
                                <p>{this.state.employee.email}</p>
                            </div>
                        </div>
                        <div className="add-role-preference-container">
                            <div className="role-preference-elements">
                                <p>Phone #</p>
                                <p>{this.state.employee.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="add-role-preference-container">
                            <div className="role-preference-elements">
                                <p>Current Role</p>
                                <p>{this.state.employee.firstName}</p>
                            </div>
                        </div>
                        <div className="add-role-preference-container">
                            <div className="role-preference-elements">
                                <p>Start Date</p>
                                <p>{this.state.employee.startDate}</p>
                            </div>
                        </div>
                        <div className="add-role-preference-container">
                            <div className="role-preference-elements">
                                <p>Supervisor</p>
                                <p></p>
                            </div>
                        </div>
                    </div>   
                </div>
                
           </div>
        </div>
    )
   }
   
}