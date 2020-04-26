interface Command {
  name: string;
  icon: JSX.Element;
  tooltip: string;
  shortcut?: string;
  handler: () => void;
}

export type Commands = Command[][];
