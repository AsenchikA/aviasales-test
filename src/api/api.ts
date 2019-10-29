const checkResponse = (response: Response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

class Api {
  public getSearchId = () => {
    return fetch('https://front-test.beta.aviasales.ru/search')
      .then(checkResponse)
      .then((response) => response.json());
  }

  public getTickets = (searchId: string) => {
    return fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
      .then(checkResponse)
      .then((response) => response.json());
  }
}

export const api = new Api();
