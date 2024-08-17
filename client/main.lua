Spawn = {
    isLoaded = false,
}

RegisterNuiCallback('isLoaded', function(_, cb)
    if Spawn.isLoaded then
        cb({
            isLoaded = false,
        })
    else
        Spawn.isLoaded = true

        cb({
            isLoaded = true,
            config = Config.UI,
        })
    end
end)

function Spawn:OpenSpawn(isNew)
    DoScreenFadeIn(0)
    SetNuiFocus(true, true)
    SendNUIMessage({
        eventName = 'openSpawn',
        payload = isNew and {
            apartments = Config.Apartments,
        } or {
            lastLocation = exports.qbx_core:GetPlayerData().position,
            properties = lib.callback.await('nf-spawn:server:getOwnedProperties', false),
        }
    })
end

--exports.qbx_core:GetPlayerData().position
exports('OpenSpawn', function(isNew)
    Spawn:OpenSpawn(isNew)
end)

RegisterCommand('spawn', function(source, args)
    if args[1] == 'new' then
        Spawn:OpenSpawn(true)
    else
        Spawn:OpenSpawn()
    end
end, false)


RegisterNuiCallback('selectApartment', function(payload, cb)
    SetNuiFocus(false, false)

    local apartment = Config.Apartments[payload]

    SetEntityCoords(PlayerPedId(), apartment.enter.x, apartment.enter.y, apartment.enter.z - 2.0, false, false, false,
        false)
    Citizen.Wait(100)
    TriggerServerEvent('qbx_properties:server:apartmentSelect', payload)


    TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
    TriggerEvent('QBCore:Client:OnPlayerLoaded')

    Citizen.Wait(250)
    DoScreenFadeIn(250)

    cb(0)
end)

RegisterNuiCallback('spawnProperty', function(payload, cb)
    SetNuiFocus(false, false)

    SetEntityCoords(PlayerPedId(), payload.enter.x, payload.enter.y, payload.enter.z, false, false, false,
        false)
    Citizen.Wait(100)
    TriggerServerEvent('qbx_properties:server:enterProperty', payload)

    TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
    TriggerEvent('QBCore:Client:OnPlayerLoaded')

    Citizen.Wait(250)
    DoScreenFadeIn(250)

    cb(0)
end)


RegisterNuiCallback('spawnAtLastLocation', function(payload, cb)
    SetNuiFocus(false, false)

    SetEntityCoords(PlayerPedId(), payload.x, payload.y, payload.z, false, false, false, false)
    SetEntityHeading(PlayerPedId(), payload.w)


    TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
    TriggerEvent('QBCore:Client:OnPlayerLoaded')

    DoScreenFadeIn(150)

    cb(0)
end)


RegisterCommand('screencoords', function(source, args)
    print(exports.qbx_core:GetPlayerData().position)
    print(GetEntityCoords(PlayerPedId()))

    local w, h = GetActiveScreenResolution()

    local bounds = {
        { -3747, 8022 },
        { 4500,  -4400 }
    }

    local wayipont = GetFirstBlipInfoId(8)
    local waypointCoords = GetBlipInfoIdCoord(wayipont)

    local x = (waypointCoords.x - bounds[1][1]) / (bounds[2][1] - bounds[1][1]) * w
    local y = (waypointCoords.y - bounds[1][2]) / (bounds[2][2] - bounds[1][2]) * h

    -- rotate 90 degrees
    x = h - x
    y = w - y

    print(x, y)

end, false)


function ConvertCoords(coords)
    local mapBounds = {
        { -3747, 8022 }, -- Top-left corner in FiveM coordinates
        { 4500,  -4400 } -- Bottom-right corner in FiveM coordinates
    }

    -- Function to convert FiveM coordinates to pixel coordinates
    function convertCoordsToPixels(x, y, screenWidth, screenHeight)
        -- Calculate the width and height of the FiveM map in game units
        local fivemWidth = mapBounds[2][1] - mapBounds[1][1]
        local fivemHeight = mapBounds[2][2] - mapBounds[1][2]

        -- Normalize the FiveM coordinates relative to the map bounds
        local normalizedX = (x - mapBounds[1][1]) / fivemWidth
        local normalizedY = (y - mapBounds[1][2]) / fivemHeight

        -- Convert the normalized coordinates to pixel coordinates based on screen size
        local pixelX = normalizedX * screenWidth
        local pixelY = (1 - normalizedY) * screenHeight

        return pixelX, pixelY
    end

    -- Example usage
    local fivemX, fivemY = 0, 0 -- Replace with your FiveM coordinates
    local screenWidth = 1920    -- Replace with your screen width in pixels
    local screenHeight = 1080   -- Replace with your screen height in pixels

    local pixelX, pixelY = convertCoordsToPixels(fivemX, fivemY, screenWidth, screenHeight)
    print("Pixel coordinates: ", pixelX, pixelY)
end
