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
    DoScreenFadeOut(0)
    SetNuiFocus(true, true)
    SendNUIMessage({
        eventName = 'openSpawn',
        payload = isNew and {
            firstApartments = Config.Apartments,
        } or {
            defaultSpawns = Config.DefaultSpawns,
            lastLocation = exports.qbx_core:GetPlayerData().position,
            properties = lib.callback.await('nf-spawn:server:getOwnedProperties', false),
        }
    })
end

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
    SetEntityCoords(PlayerPedId(), payload.location.x, payload.location.y, payload.location.z - 2.0, false, false, false,
        false)
    Citizen.Wait(250)
    TriggerServerEvent('qbx_properties:server:apartmentSelect', payload.apartmentId)

    TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
    TriggerEvent('QBCore:Client:OnPlayerLoaded')

    Citizen.Wait(250)
    DoScreenFadeIn(250)
    SetNuiFocus(false, false)

    cb(0)
end)

RegisterNuiCallback('spawnAt', function(payload, cb)
    SetEntityCoords(PlayerPedId(), payload.x, payload.y, payload.z, false, false, false, false)
    SetEntityHeading(PlayerPedId(), payload.w)

    TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
    TriggerEvent('QBCore:Client:OnPlayerLoaded')
    Citizen.Wait(250)
    DoScreenFadeIn(250)
    SetNuiFocus(false, false)

    cb(0)
end)


RegisterNuiCallback('spawnProperty', function(payload, cb)
    -- SetNuiFocus(false, false)

    -- SetEntityCoords(PlayerPedId(), payload.location.x, payload.location.y, payload.location.z, false, false, false,
    --     false)
    -- Citizen.Wait(100)
    -- TriggerServerEvent('qbx_properties:server:enterProperty', payload)

    -- TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
    -- TriggerEvent('QBCore:Client:OnPlayerLoaded')

    -- Citizen.Wait(250)
    -- DoScreenFadeIn(250)

    cb(0)
end)