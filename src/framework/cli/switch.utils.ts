export function getSwitch(args: readonly string[], switchName: string) {
  return args.filter(getSwitchNameEquals(switchName));
}

export function getSwitchNameEquals(switchName: string) {
  return (switchString: string) => switchString.includes(`--${switchName}=`);
}

export function getSwitchValue(switchName: string) {
  return (switchString: string) => switchString.split(`--${switchName}=`)[1];
}
