import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "https://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes").then((response) =>
      response.json().then((response) => {
        const { memes } = response.data;

        this.setState({ allMemeImgs: memes });
      })
    );
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleButtonClick(event) {
    event.preventDefault();
    const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randomImg = this.state.allMemeImgs[randomNum].url;
    this.setState({ randomImg: randomImg });
  }

  render() {
    return (
      <main>
        <form className="meme-form" onSubmit={this.handleButtonClick}>
          <label>
            Name :
            <input
              type="text"
              name="topText"
              placeholder="Top Text"
              value={this.state.topText}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Surname :
            <input
              type="text"
              name="bottomText"
              placeholder="Bottom Text"
              value={this.state.bottomText}
              onChange={this.handleChange}
            />
          </label>

          <button>GEN</button>
        </form>

        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </main>
    );
  }
}

export default MemeGenerator;
