# poptopo

Tag a place, attach a GPS track to it, and see both draped over exaggerated 3D
terrain. The name is the joke: topo maps, but they pop.

Rails 8 · Hotwire · Mapbox GL JS · SQLite · Kamal

> **Status: early.** Basic map, tags and tracks work. There is no
> authentication, no test coverage to speak of, and the data model is
> deliberately thin. This is a personal project, not a product.

## What it does

A **tag** is a named point — a name, a latitude and a longitude. A **track** is a
named GeoJSON file attached to a tag. One tag has many tracks.

The map renders in Mapbox's satellite-streets style with a raster DEM source
supplying elevation, terrain exaggeration at 1.5×, and the camera pitched to 72°.
That combination is the whole point: a route on a flat map tells you where you
went, and the same route on exaggerated terrain tells you what it cost.

Tags drop as markers whose popups link to their own map view, an edit form, and
a new-track form. Markers are draggable — dropping one somewhere new offers to
move the tag there. Tracks render as line layers over the terrain.

Three views, all served by `MapController`:

| route | shows |
|---|---|
| `/` | every tag, centred on their average position |
| `/map/tags/:id` | one tag with all of its tracks |
| `/map/tracks/:id` | a single track and its tag |

Tags and tracks also have conventional Rails CRUD under `/tags`, with tracks
nested beneath them.

## Running it

```sh
bin/setup          # bundle, prepare the database
bin/dev            # http://localhost:3000
```

You will need a Mapbox access token of your own; see `app/javascript/controllers/map_controller.js`.

## Structure

```
app/models/tag.rb                            a named lat/lng point
app/models/track.rb                          a GeoJSON file attached to a tag
app/controllers/map_controller.rb            serialises tags and tracks for the map
app/javascript/controllers/map_controller.js  Mapbox: terrain, markers, line layers
app/views/map/                               index, tag, track
```

Track files are stored with Active Storage and downloaded server-side before
being handed to the view as JSON.

## Known gaps

- No authentication — anyone who can reach it can edit anything.
- `MapController` downloads every track's file on each request; fine for a
  handful, wrong for many.
- Dragging a marker and cancelling leaves it in the new position rather than
  returning it.
- Map state lives entirely in the Stimulus controller. Some of it probably
  belongs in Rails.
