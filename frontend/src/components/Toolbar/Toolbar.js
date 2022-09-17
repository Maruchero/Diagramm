import { Component } from "react";
import styles from "./Toolbar.module.css";

export class Toolbar extends Component {
  firstMount = true;
  state = {
    tools: [],
  };

  componentDidMount = () => {
    if (this.firstMount) {
      // Create tools objects array
      let tools = ["NewNode", "EditNode"];
      for (let tool of tools) {
        this.setState((prevState) => ({
          tools: [
            ...prevState.tools,
            {
              name: tool,
              classes: [styles.item],
            },
          ],
        }));
      }

      // Disable running again
      this.firstMount = false;
    }
  };

  #setToolMode = (toolName, mode) => {
    let toolIndex = this.state.tools.findIndex((tool) => tool.name === toolName);
    let tools = this.state.tools;

    // Toggle active class
    if (mode === "active") tools[toolIndex].classes.push(styles.active);
    else tools[toolIndex].classes.pop();

    // Upsate data
    this.setState({ tools });
  };

  render() {
    return (
      <div className={styles.toolbar}>
        {this.state?.tools?.map((tool) => (
          <span
            key={tool.name}
            className={tool.classes.join(" ")}
            onMouseEnter={() => this.#setToolMode(tool.name, "active")}
            onMouseLeave={() => this.#setToolMode(tool.name, "unactive")}
          >
            {tool.name}
          </span>
        ))}
      </div>
    );
  }
}
