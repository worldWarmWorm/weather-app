#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";

const initCLI = () => {
  const args = getArgs(process.argv);
  console.log(args);
  if (args.h) {
    // output help
  } else if (args.s) {
    // save city
  } else if (args.t) {
    // save token
  } else {
    // output weather
  }
}

initCLI();