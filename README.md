
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This is a research study of the web app-based cognitive assessment. Before deciding to participate, you need to understand why the research is being conducted and what your participation will involve.
Frontotemporal dementia is an uncommon type of dementia that causes problems with behaviour and language.Dementia is the name for problems with mental abilities caused by gradual changes and damage in the brain. Frontotemporal dementia affects the front and sides of the brain (the frontal and temporal lobes) Dementia mostly affects people over 65, but frontotemporal dementia tends to start at a younger age. Most cases are diagnosed in people aged 45-65, although it can also affect younger or older people. Like other types of dementia, frontotemporal dementia tends to develop slowly and get gradually worse over several years.

Various test used to diagonise FTD:
* Emotion Recognation Test
* ACE III
* Trail Making Test
* Pulse Tracking Test
* VisuoSpatial Test





<p align="right">(<a href="#readme-top">back to top</a>)</p>

The objective of the project is to develop a tool for the detection of dementia(FTD) in individuals based on their performance in various cognitive tests. The project was undertaken as part of a research initiative to find a non-invasive and cost-effective method for early diagnosis of dementia.

### Methodology:
The project involved conducting various cognitive tests on a sample population consisting of both healthy individuals and those with confirmed dementia. The tests were designed to assess different aspects of cognitive function, such as memory, attention, and executive function.

The data collected from the tests was then analyzed using various statistical techniques to identify the key features that could be used to distinguish between the healthy and dementia groups. The features identified will be used to develop a machine learning model that will predict the presence of dementia in individuals based on their test performance.


### Built With

The Following Tech Stack is used for developing this website :

* ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
* ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
* ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

# Create-Flask-App [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/isakal/create-flask-app/pull/new/master)

Flask port of [create-react-app](https://facebook.github.io/create-react-app/) that is used for initializing project structure of your next application.

- [Creating an app](#creating-an-app) - How to create a new app.

Create Flask app works on macOS, Windows and Linux.
If something doesn't work, please [file an issue](https://github.com/isakal/create-flask-app/issues/new).
If you have questions, suggestions or need help, [feel free to open an issue](https://github.com/isakal/create-flask-app/issues/new).

## Quick overview 


*(Use correct version of [pip](https://pip.pypa.io/en/stable/) and [python](https://python.org/) according to your OS and python install)*
Then open [http://localhost:5000](http://localhost:5000) to see your app.
When you are ready to deploy to production, set environment variable `PRODUCTION` to  `True` on your server of choice, clone the project onto your server and spin it up.


## Creating an app

**You'll need to have Python 3.6 or higher on your local development machine** (but it's not required on the server).
To create a new app, you can run :


### python
```sh
pip install flask
```
### Virtual env 
```sh
pip install virtualenv
python -m venv env
```
```sh
env/Scripts/activate
```
```sh
flask run 
```
or 
```sh
python app.py 
```

It will create a directory called my-app inside the current folder.
Inside that directory, it will generate the initial project structure :
```
my-app/
├──venv
├── app
│   ├── __init__.py     
│   ├── config.py       
│   ├── errors
│   │   ├── __init__.py 
│   │   └── handlers.py 
│   ├── home
│   │   ├── __init__.py 
│   │   └── routes.py   
│   ├── static
│   │   └── css
│   │       └── main.css
│   └── templates     
│       ├── about.html
│       ├── base.html 
│       ├── error.html
│       └── home.html 
├── requirements.txt  
└── run.py
```

No complicated configuration or folder structures, only the files you need to build and deploy your app.
Once the installation is done, you can open your project folder:
```sh
cd my-app
```
Inside the newly created project, you can run some commands:

### `source venv/bin/activate` or `.\venv\Scripts\activate`
Activates the virutal environment required for the project dependency isolation.

[Read more about venv.](https://https://docs.python.org/3/library/venv.html)  

### `pip install -r requirements.txt`
Installs libraries and dependencies listed in `requirements.txt` in active environment.

### `python run.py`
Starts the app in development mode. 
Open [http://localhost:5000](http://localhost:5000) to view it in browser.

The page will automatically reload if you make changes to the code. 
You will see errors in app reload or startup in the console.


## How to Update to New Versions?

Create-Flask-App can be simply upgraded using pip:

```sh
pip install createflaskapp --upgrade
# or
pip install createflaskapp -U
```

## What's Included?

Your environment after installing everything from `requirements.txt` will have everything you need to build simple but modern Flask app:
- Isolated Python environment with fully functional pip.
- [Flask](https://www.palletsprojects.com/p/flask/), lightweight WSGI web application framework.
- A live development server that warns about errors and exceptions.
- [Jinja](https://jinja.palletsprojects.com/en/2.10.x/) template engine that is very fast and has very similar syntax to python.
- [Click](https://click.palletsprojects.com/en/7.x/), composable command line interface toolkit.

Check out [this guide](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) for an overview of how these tools fit toghether.
<!-- CONTRIBUTING -->
## Contributors
* Moin Bashir Zargar
* Fasil Shafi
* Fazeel Jaffer
* Zahoor Ahmad
* Haseeb Hijazi Khan


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>
"

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/fasil-code/intern](https://github.com/fasil-code/intern)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Report lab](https://www.reportlab.com/)
* [Bycrypt](https://github.com/pyca/bcrypt/)
* [wtf_forms](https://flask-wtf.readthedocs.io/en/1.0.x/o)
* [GitHub Pages](https://pages.github.com)
* [Ck_Plus Dataset](https://www.kaggle.com/datasets/salmaachour/ckplus-without-duplicates)
* [Language Tool API](https://rapidapi.com/dnaber/api/languagetool)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.py]: https://img.shields.io/badge/flask.py-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
