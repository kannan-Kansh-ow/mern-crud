import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export default class StudentTableRow extends Component {
  constructor(props) {
    super(props)
    this.deleteStudent = this.deleteStudent.bind(this)
  }

  deleteStudent() {
    axios
      .delete(
        'https://api-dot-fourth-epigram-399012.ew.r.appspot.com/students/delete-student/' + this.props.obj._id,
      )
      .then((res) => {
        console.log('Student successfully deleted!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.rollno}</td>
        <td>
          <Link
            className="text-primary m-2" path={"product/:id"}
            to={'/edit-student/' + this.props.obj._id}
          >
            <i class="bi bi-pencil"></i>
          </Link>
          <Link onClick={this.deleteStudent}className='text-danger m-2'>
          <i class="bi bi-trash"></i>
          </Link>
        </td>
      </tr>
    )
  }
}
