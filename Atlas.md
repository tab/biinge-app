
### Indexes

* biinge-development.Movie (TvShow | TvSeason | TvEpisode)

Fields
```
{
  "userId": "1",
  "tmdb_id": "1"
}
```

Options

```
{
  unique: true
}
```

```shell
db.Movie.createIndex({ userId: 1, tmdbId: 1 }, { unique: true, compound: true })
```

```shell
db.TvShow.createIndex({ userId: 1, tmdbId: 1 }, { unique: true, compound: true })
db.TvSeason.createIndex({ userId: 1, tmdbId: 1 }, { unique: true, compound: true })
db.TvEpisode.createIndex({ userId: 1, tmdbId: 1 }, { unique: true, compound: true })
```

```shell
db.Profile.createIndex({ userId: 1 }, { unique: true, compound: true })
```
