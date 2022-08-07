Par principe l'affichage d'un calendrier est un **problème algorithmique** (*vous n'avez probablement pas poussé trop ce concept jusqu'à présent*)

# Dans un premier temps 
- Récupérer la date du jour
- En extraire le mois et l'année
- Afficher en haut le mois et l'année (plus les boutons précédent et suivant)

# Dans un deuxième temps
**Pour afficher les jours du mois**
- Récupérer le numéro du jour de la semaine du premier jour du mois
- Boucle for de 0 à 1er jour du mois 
- Ajout d'une div grisée pour les jours de la semaine ne comprenant pas de jour du mois
- Récupérer le numéro du dernier jour du mois (28,29,20 ou 31)
- Boucle for de 0 à dernier jour du mois et on ajoute une div avec le numéro du jour 
- Récupère le numéro de jour dans la semaine du dernier jour du mois
- Boucle for de numéro de jour dans la semaine du dernier jour jusqu'a 7 
- Ajouter une div grisée

# Petit plus à ne pas oublier
Si on change de mois, on redemande l'affichage du calendrier pour le nouveau mois.