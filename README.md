# Enjoy My RailStation

# Usage

Install dependencies with `yarn`, then run with `yarn develop`;

then you can request api on route `http://localhost:3001/api/services`, and filter using query params : `http://localhost:3001/api/services?where=gare%20IN%20%28%22Angers%20Saint-Laud%22%2C%20%22Nantes%22%29`

## TODOs

- Add comparison logic in a new service `src\app\controllers\api.controller.ts@compareServices`

## Contexte

========

Pour les usagers du train
Qui souhaitent se distraire en gare
EMR (Enjoy My RailStation) est une application
Qui permet de comparer les services disponibles entre différentes gares

## Description

============

L'application est une API. L'utilisateur peut la requêter avec une liste de gares à comparer. En retour, il aura une comparaison des services en gare.

L'application s'appuie sur les APIs publiques de la SNCF pour récupérer et comparer les services disponibles dans les gares.

### Exemple

---

Exemple d'un utilisateur qui veut comparer les services en gare de Nantes et d'Angers Saint-Laud.

L'utilisateur entre les gares à comparer :
Input: ["Nantes", "Angers Saint-Laud"]

En sortie, il reçoit
Output :

<pre>
{
  "piano": {
    "stations": ["Nantes", "Angers Saint-Laud"],
  },
  "distr_histoires_courtes": {
    "stations": ["Nantes", "Angers Saint-Laud"],
  },
  "power_station": {
    "stations": ["Nantes"],
  }
}
</pre>

## TAF

===

- Monter une API en typescript
- Requêter les apis publiques SNCF :
  Récupérer les services en gare grace au web service : <https://ressources.data.sncf.com/api/v2/catalog/datasets/gares-pianos/records>
  Nous utiliserons le query param "where" pour filtrer les gares.

  Par exemple, pour sélectionner les gares de Nantes et d'Angers-Saint-Laud la valeur du query param "where" est "gare IN ("Angers Saint-Laud", "Nantes")" :
  <https://ressources.data.sncf.com/api/v2/catalog/datasets/gares-pianos/records?where=gare%20IN%20%28%22Angers%20Saint-Laud%22%2C%20%22Nantes%22%29>

- Mettre en forme les résultats en regroupant les gares par services

Ressources utiles :
Swagger : <https://ressources.data.sncf.com/api/v2/console>

## Bonus

=====

Nous pouvons utiliser la fréquentation de la gare pour remonter à l'utilisateur quelle gare propose le meilleur service.

Pour cela, nous calculerons un ratio "nombre de service"/"fréquentation" (par exemple, 2 pianos pour 100 000 voyageurs).

Nous récupérons la fréquentation des gares grace au service <https://ressources.data.sncf.com/api/v2/catalog/datasets/frequentation-gares/records>.
Nous utiliserons le query param "where" pour filtrer les gares.
Par exemple, pour sélectionner les gares de Nantes et d'Angers-Saint-Laud la valeur du query param "where" est "nom_gare IN ("Angers Saint-Laud", "Nantes")" :
<https://ressources.data.sncf.com/api/v2/catalog/datasets/frequentation-gares/records?where=nom_gare%20IN%20%28%22Angers%20Saint-Laud%22%2C%20%22Nantes%22%29>

### Exemple

---

Input: ["Nantes", "Angers Saint-Laud"]

Output :

<pre>
{
  "piano": {
    "stations": ["Nantes", "Angers Saint-Laud"],
 "best_station": "Angers Saint-Laud"
  },
  "distr_histoires_courtes": {
    "stations": ["Nantes", "Angers Saint-Laud"],
 "best_station": "Angers Saint-Laud"
  },
  "power_station": {
    "stations": ["Nantes"],
 "best_station": "Nantes"
  }
}
</pre>

Détail du calcul de la "best_station" pour le service "piano" :
Fréquentation en gare de Nantes (total_voyageurs_2020) : 8047221
Nombre de pianos : 1
Ratio Nantes (pianos par voyageur) : 1/8047221

Fréquentation en gare de Angers Saint-Laud (total_voyageurs_2020) : 3433325
Nombre de pianos : 1
Ratio Angers (pianos par voyageur) : 1/3433325

La "best_station" est Angers car ratio Angers > ratio Nantes