local function CheckVersion()
    local scriptName = GetCurrentResourceName()

    local currentVersion = GetResourceMetadata(scriptName, "version", 0)

    if not currentVersion then
        return print(("^1Unable to determine current resource version for '%s' ^0"):format(
            scriptName))
    end


    PerformHttpRequest("https://raw.githubusercontent.com/lorewave/versions/main/scripts.json",
        function(status, response)
            if status ~= 200 then return end
            local res = json.decode(response)
            local liveVersion = res[scriptName]

            if currentVersion ~= liveVersion then
                print(("^3%s^0 is ^8outdated^0. Consider updating to version ^2%s^0."):format(
                    scriptName, liveVersion))
            else
                print(("^3%s^0 is ^2up to date^0. Current version: ^2%s^0."):format(
                    scriptName, currentVersion))
            end
        end, "GET")
end
CheckVersion()


lib.callback.register('nf-spawn:server:getOwnedProperties', function(source)
    local _source = source

    if not _source then
        return
    end

    local properties = {}

    local response = MySQL.query.await('SELECT * FROM properties WHERE owner = ?', {
        exports.qbx_core:GetPlayer(_source).PlayerData.citizenid
    })

    if response then
        for i = 1, #response, 1 do
            local coords = json.decode(response[i].coords)

            table.insert(properties, {
                id = response[i].id,
                interior = response[i].interior,
                label = response[i].property_name,
                description = 'You own this property.',
                enter = vec3(coords.x, coords.y, coords.z)
            })
        end
    end

    return properties
end)
