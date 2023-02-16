

export async function fetchSession() {
    const response = await fetch('http://localhost:3000/api/session',{
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();
   
    return data.user;
}