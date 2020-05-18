import React, { Component } from 'react'

class ProfileStatus extends Component {
    statusInputRef = React.createRef()

    state = {
        editMode: false,
        status: this.props.status
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({ status: this.props.status})
        }
    }

    /*custom methods*/
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = event => {
        this.setState({
            status: event.target.value
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={ this.activateEditMode }>{this.state.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            onChange={this.onStatusChange}
                            onBlur={this.deactivateEditMode}
                            value={this.state.status}
                            autoFocus={true}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;