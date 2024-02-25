## MajorMud Web Explorer

This project aims to make data from MajorMud easily explorable from the web. Currently this has weapons and armor set up for the [Paradigm](https://turbosentry.info/realm/greatergmudpve) mud as a proof of concept, but it could be used with any MajorMud database file.

### Database file

A MDB file is required to set up your own data. The data needs to be converted to JSON, which can be done with [MDBTools](https://github.com/mdbtools/mdbtools). Create a file from the database and call it `items.json` and put it in this repo and then run the `yarn generate` command to parse the json into a more useful data structure. This will create the `armor.json` and `weapons.json` file in the `src/data` folder.
