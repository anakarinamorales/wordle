export default function GridLetter({ color, letter }: {letter:string; color:string; }) {
    return <span style={{color: color}}>{letter}</span>
}