import React from 'react';

export default class group extends React.component {
  constructor(props) {
    super(props);
    this.state = { groupName: '', groupInfo: '', groupPicture: '' };
    this.fileInputRef = React.createRef();
    this.handleGroupName = this.handleGroupName.bind(this);
    this.handleGroupInfo = this.handleGroupInfo.bind(this);
    this.handleGroupPicture = this.handleGroupPicture.bind(this);
  }

  handleGroupName(event) {
    this.setState({ groupName: event.target.value });
  }

  handleGroupInfo(event) {
    this.setState({ groupInfo: event.target.value });
  }

  handleGroupPicture(event) {
    this.setState({ groupPicture: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = new FormData();
    form.append('groupPicture', this.state.groupPicture);
    form.append('groupName', this.state.groupName);
    form.append('groupInfo', this.state.groupInfo);
    form.append('image', this.fileInputRef.current.files[0]);

    fetch('/api/groups', {
      method: 'POST',
      body: form
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ groupName: '', groupInfo: '', groupPicture: '' });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="groupName" className="form-label">Group Name</label>
          <input type="text" value={this.state.groupName} onChange={this.handleGroupName} className="form-control" id="groupName" />
        </div>
        <div className="mb-3">
          <textarea className="form-control" value={this.state.groupInfo} onChange={this.handleGroupInfo} id="exampleFormControlTextarea1" rows="3" placeholder="About..." />
        </div>
        <div className="mb-3">
          <input className="form-control" type="file" id="formFile" placeholder="Choose group picture" value={this.state.groupPicture} onChange={this.handleGroupPicture} />
        </div>
        <div>
          <button type="button" className="btn btn-primary">POST</button>
        </div>
      </form>
    );

  }
}
