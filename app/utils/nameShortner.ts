export default function nameShortner(name: string): string {
    if (!name) return ''
    const [firstName, lastName] = name.split(' ');
    
    if (!lastName) return firstName.slice(0, 2);
    return firstName[0] + lastName[0].toLowerCase();

}