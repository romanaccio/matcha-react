import React, { Component } from 'react';
import PropTypes from 'prop-types'
import MatchaButton from 'components/MatchaButton'
import RadioButtons from 'components/RadioButtons';
import Dropdown from 'components/Dropdown'
import { regions, genders } from 'models/User'
import { isEmptyString } from '../helpers/validation'
import Alert from './Alert'
import Avatar from './Avatar'
import DatePicker from './DatePicker'
import moment from 'moment'

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      modified: false,
      userData: { 
        ...this.props.user,
        birthday: new Date(this.props.user.birthday) // this convertion is needed because
        // Firebase Realtime db stores Date objects as UTC strings
        },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeRadioButton = this.handleChangeRadioButton.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleChange(event) {
    const userData = {
      ...this.state.userData,
      [event.target.name]: event.target.value,
    }
    this.setState({
      userData,
      modified: true,
    })
  }

  handleChangeRadioButton(name, value) {
    const userData = {
      ...this.state.userData,
      [name]: parseInt(value, 10),
    }
    this.setState({
      userData,
      modified: true,
    })
  }

  handleChangeCheckbox(event) {
    console.log('handleChangeCheckbox')
    const userData = {
      ...this.state.userData,
      [event.target.name]: !this.state.userData[event.target.name],
    }
    this.setState({
      userData,
      modified: true,
    })
  }

  handleDayChange(day) {
    const userData = {
      ...this.state.userData,
      birthday: day
    }
    this.setState({
      userData,
      modified: true,
    })
  }

  readUserDataFromState() {
    const userData = {
      ...this.state.userData,
    }
    return userData
  }

  handleSubmit(event) {
    event.preventDefault()
    const userData = this.readUserDataFromState()
    this.props.onSubmit(userData)
    this.setState({ modified: false })
  }

  render() {
    const { userData } = this.state
    console.group(`ProfileForm render : userData = ${userData}`)
    const isInvalid = !this.state.modified || isEmptyString(userData.username) // TODO: mettre une vraie validation ici

    return (
      <div>
        { userData
          ? (
            <form onSubmit={this.handleSubmit}>
              <table className="table-auto">
                <tbody>
                  <tr className="border-b-2 border-solid">
                    <th>Email</th>
                    <td>{this.state.userData.email}</td>
                  </tr>
                  <tr className="border-b-2 border-solid">
                    <th>Photo</th>
                    <td>
                      <Avatar username={this.state.username} photoURL={userData.photoURL} />
                    </td>
                  </tr>
                  <tr className="border-b-2 border-solid">
                    <th>Username</th>
                    <td>
                      <input name="username" placeholder="Username" value={userData.username} type="text" onChange={this.handleChange} required />
                    </td>
                  </tr>
                  <tr className="border-b-2 border-solid">
                    <th>Firstname</th>
                    <td>
                      <input name="firstname" placeholder="Firstname" value={userData.firstname} type="text" onChange={this.handleChange} required />
                    </td>
                  </tr>
                  <tr className="border-b-2 border-solid">
                    <th>Lastname</th>
                    <td>
                      <input name="lastname" placeholder="Lastname" value={userData.lastname} type="text" onChange={this.handleChange} required />
                    </td>
                  </tr>
                  <tr className="border-b-2 border-solid">
                    <th>Description</th>
                    <td>
                      <textarea name="description" placeholder="Description" rows="5" value={userData.description} onChange={this.handleChange} />

                    </td>
                  </tr>
                  <tr className="border-b-2 border-solid">
                    <th>Gender</th>
                    <td>
                      <RadioButtons
                        selectedElement={this.state.userData.gender}
                        elementList={genders}
                        name="gender"
                        className="mr-5"
                        onSelect={this.handleChangeRadioButton}
                      />
                    </td>
                  </tr>
                  <tr className="border-b-2 border-solid">
                    <th>Preferred gender</th>
                    <td>
                      <RadioButtons
                        selectedElement={this.state.userData.preferredGender}
                        elementList={genders}
                        name="preferredGender"
                        className="mr-5"
                        onSelect={this.handleChangeRadioButton}
                      />
                    </td>
                  </tr>
                  <tr className="border-b-2 border-solid">
                    <th>Region</th>
                    <td>
                      {/* <RadioButtons
                                            selectedElement={this.state.userData.region}
                                            elementList={regions}
                                            name="region"
                                            className="mr-5"
                                            onSelect={this.handleChangeRadioButton}
                                        ></RadioButtons> */}
                      <Dropdown
                        selectedElement={this.state.userData.region}
                        elementList={regions}
                        name="region"
                        className="mr-5"
                        onSelect={this.handleChangeRadioButton}
                      />

                    </td>
                  </tr>
                  <tr className="border-b-2 border-solid">
                    <th>Birthday</th>
                    <td>
                      <DatePicker onDayChange={this.handleDayChange} value={this.state.userData.birthday}/>
                    </td>
                  </tr>
                  <tr className="border-b-2 border-solid">
                    <th>Visibility</th>
                    <td>
                      <label>
                        <input className="mr-5" type="checkbox" name="visible" checked={userData.visible} onChange={this.handleChangeCheckbox} />
                        I want my profile to be visible to others
                                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
              <MatchaButton text="Validate" type="submit" disabled={isInvalid} />

            </form>
          )
          : (
            <Alert color="red">
              Invalid user!
            </Alert>
          )}
      </div>
    )
  }
}

ProfileForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func,
}
export default ProfileForm
