import Pattern1 from './Images/patterns/pattern1.png'
import Pattern2 from './Images/patterns/pattern2.png'
import Pattern3 from './Images/patterns/pattern3.png'
import Pattern4 from './Images/patterns/pattern4.png'
import Pattern5 from './Images/patterns/pattern5.png'
import Pattern6 from './Images/patterns/pattern6.png'
import Pattern7 from './Images/patterns/pattern7.png'
import Pattern8 from './Images/patterns/pattern8.png'
import Pattern9 from './Images/patterns/pattern9.png'
import Pattern10 from './Images/patterns/pattern10.png'
import Pattern11 from './Images/patterns/pattern11.png'
import Pattern12 from './Images/patterns/pattern12.png'
import Pattern13 from './Images/patterns/pattern13.png'
import Pattern14 from './Images/patterns/pattern14.png'
import Pattern15 from './Images/patterns/pattern15.png'
import Pattern16 from './Images/patterns/pattern16.png'
import Pattern17 from './Images/patterns/pattern17.png'
import Pattern18 from './Images/patterns/pattern18.png'
import Pattern19 from './Images/patterns/pattern19.png'
import Pattern20 from './Images/patterns/pattern20.png'
import Pattern21 from './Images/patterns/pattern21.png'
import Pattern22 from './Images/patterns/pattern22.png'


export const randomPatterns = [
    Pattern1, Pattern2, Pattern3, Pattern4, Pattern5, Pattern6, Pattern7, Pattern8,
    Pattern9, Pattern10, Pattern11, Pattern12, Pattern13, Pattern14, Pattern15, Pattern16,
    Pattern17, Pattern18, Pattern19, Pattern20, Pattern21, Pattern22
]

// Random Pattern for Notebook
export const randomPatternGenerator = () => {
    const indexOfPattern = Math.floor(Math.random() * randomPatterns.length);
    return indexOfPattern;
};


// Dummy Data
export const notebooks = [
    {
        "name": "Notebook1",
        "notesCount": 7,
        "pattern": randomPatternGenerator(),
        "notebookId": "5ced0001-004b-43d0-b778-df33242ce62e"
    },
    {
        "name": "Notebook2",
        "notesCount": 7,
        "pattern": randomPatternGenerator(),
        "notebookId": "5ced0001-004b-43d0-b778-df33242ce62e"
    },
    {
        "name": "Notebook3",
        "notesCount": 7,
        "pattern": randomPatternGenerator(),
        "notebookId": "5ced0001-004b-43d0-b778-df33242ce62e"
    },
    {
        "name": "Notebook4",
        "notesCount": 7,
        "pattern": randomPatternGenerator(),
        "notebookId": "5ced0001-004b-43d0-b778-df33242ce62e"
    }
]
